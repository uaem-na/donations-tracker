import { debug } from "debug";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { FilterQuery } from "mongoose";
import { PostStatus } from "../constants";
import { AuthorizationError } from "../errors";
import { PostDto } from "../models/posts";
import { UserDto } from "../models/users";
import { PostService, ResendService, UserService } from "../services";
import { PaginatedResponse, PostDocument, UserDocument } from "../types";
import {
  tryParsePaginationQuery,
  tryParsePostFilterQuery,
  tryParseUserFilterQuery,
} from "../utils";
import {
  hasAdminRole,
  hasUser,
  validatePaginationRequest,
  validatePostId,
  validatePostsFilterRequest,
  validateUserDeactivationReason,
  validateUserId,
  validateUsersFilterRequest,
} from "./validators";

const log = debug("backend:admin");

export class AdminController {
  constructor(
    private postService: PostService,
    private userService: UserService,
    private resendService: ResendService,
  ) {}

  pre = (req) => {
    if (!hasUser(req) || !hasAdminRole(req)) {
      throw new AuthorizationError("Unauthorized");
    }
  };

  getPostsToApprove = expressAsyncHandler(async (req, res, next) => {
    this.pre(req);

    log(`${req.user?.id} is getting posts to approve`);

    await validatePaginationRequest({ req, optional: false });
    await validatePostsFilterRequest({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { page, limit } = tryParsePaginationQuery(req);
    const { postType, userType, priceRange, categories, date } =
      tryParsePostFilterQuery(req);

    //! date objects in MongoDB stored in UTC, adjust for ET
    const easternTimeOffset = -4.0;

    const filterQuery: FilterQuery<PostDocument> = {
      status: PostStatus.PENDING_APPROVAL,
      ...(postType && { type: postType }),
      ...(userType && { authorType: userType }),
      ...(priceRange && { priceRange: priceRange }),
      ...(categories && {
        "item.category": { $in: categories },
      }),
      ...(date && {
        createdAt: {
          $gte: new Date(date.getTime() - easternTimeOffset * 60 * 60 * 1000),
        },
      }),
    };

    const [posts, count] = await this.postService.getPaginatedPosts(
      page,
      limit,
      filterQuery,
      { updatedAt: -1, createdAt: -1 },
    );

    const postDtos = posts.map((post) => PostDto.fromDocument(post));

    const response: PaginatedResponse<PostDto> = {
      data: postDtos || [],
      page: page,
      per_page: limit,
      total: count,
    };

    res.json(response);
  });

  /* TODO: add an async handler for users filtered based on post report status
    must make an aggregate db call with re

  */

  getUserById = expressAsyncHandler(async (req, res, next) => {
    this.pre(req);

    log(`${req.user?.id} is getting user by id`);

    await validateUserId({ key: "id", req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { id } = req.params;

    const user = await this.userService.getUserById(id);

    if (!user) {
      res.status(404).json({ error: `User ${id} not found.` });
      return;
    }

    const userDto = UserDto.fromDocument(user);
    res.json(userDto);
  });

  getUsersToVerify = expressAsyncHandler(async (req, res, next) => {
    this.pre(req);

    log(`${req.user?.id} is getting users`);

    await validatePaginationRequest({ req, optional: false });
    await validateUsersFilterRequest({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }
    log("The request ", req.query);

    const { page, limit } = tryParsePaginationQuery(req);
    const { userType, withReport } = tryParseUserFilterQuery(req);

    const filterQuery: FilterQuery<UserDocument> = {
      ...(userType && { role: userType }),
    };

    const [users, count] = await this.userService.getPaginatedUsers(
      withReport,
      page,
      limit,
      filterQuery,
      { updatedAt: -1, createdAt: -1 },
    );

    const userDtos = users.map((user) => UserDto.fromDocument(user));

    const response: PaginatedResponse<UserDto> = {
      data: userDtos || [],
      page: page,
      per_page: limit,
      total: count,
    };

    res.json(response);
  });

  approvePost = expressAsyncHandler(async (req, res, next) => {
    await validatePostId({ req, optional: false });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { postId } = req.body;
    if (!postId) {
      res
        .status(400)
        .json({ error: `Error approving post. Post ID must be specified.` });
      return;
    }

    const post = await this.postService.approvePost(postId);

    log(`${req.user?.id} approved post ${postId}.`);

    const { author } = post;
    if (author?.email) {
      const { displayName, email } = author;
      log(`sending email to author ${email}`);

      const body = `Dear ${displayName},

      We are pleased to inform you that your recent post on our platform has been approved by our administrators. The restrictions previously placed on your post have now been removed, and it is open to the public.
      We appreciate your contribution and look forward to seeing more engaging content from you.
      If you have any questions or need further assistance, please don't hesitate to reach out to our support team.
      Thank you for being an active member of our community.`;

      this.resendService.send({
        to: email,
        subject: "Your post has been approved",
        html: body,
      });
    } else {
      log(`author/author's email not defined, skip sending email`);
    }

    res.status(200).json({ message: `Successfully approved post ${postId}.` });
  });

  rejectPost = expressAsyncHandler(async (req, res, next) => {
    await validatePostId({ req, optional: false });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { postId } = req.body;
    if (!postId) {
      res
        .status(400)
        .json({ error: `Error rejecting post. Post ID must be specified.` });
      return;
    }

    const post = await this.postService.rejectPost(postId);

    log(`${req.user?.id} rejected post ${postId}.`);

    const { author } = post;
    if (author?.email) {
      const { displayName, email } = author;
      log(`sending email to author ${email}`);

      const body = `Dear ${displayName},

      Thank you for submitting your recent post on our platform. After careful review by our administrators, we regret to inform you that your post has not been approved for publication.
      This decision was made to ensure the quality and relevance of content shared within our community. We encourage you to review our content guidelines and consider making adjustments to your post for resubmission.
      If you have any questions or need further clarification on the decision, please feel free to reach out to our support team. We are here to assist you and provide any necessary guidance.
      Thank you for your understanding and continued participation in our community.`;

      this.resendService.send({
        to: email,
        subject: "Your post has been rejected",
        html: body,
      });
    } else {
      log(`author/author's email not defined, skip sending email`);
    }

    res.status(200).json({ message: `Successfully rejected post ${postId}.` });
  });

  verifyUser = expressAsyncHandler(async (req, res, next) => {
    await validateUserId({ key: "userId", req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { userId } = req.body;
    if (!userId) {
      res
        .status(400)
        .json({ error: `Error verifying user. User ID must be specified.` });
      return;
    }

    await this.userService.verifyOrganizationUser(userId);

    log(`${req.user?.id} verified user ${userId}.`);

    res.status(200).json({ message: `Successfully verified user ${userId}.` });
  });

  toggleUserActive = expressAsyncHandler(async (req, res, next) => {
    await validateUserId({ key: "userId", req, optional: false });
    await validateUserDeactivationReason({
      req,
      optional: true,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { userId, reason } = req.body;
    if (!userId) {
      res
        .status(400)
        .json({ error: `Error verifying user. User ID must be specified.` });
      return;
    }

    const user = await this.userService.toggleActive(userId, reason);
    let emailSubject = "";
    let emailContent = "";
    if (!user.active) {
      emailSubject =
        "Votre compte a été désactive | Your account has been deactivated";
      emailContent = `
      <div>
        <p>English content follows French</p>
        <p>
          Cher/Chère ${user.displayName},<br /><br />
          Nous regrettons de vous informer que votre compte a été désactivé. Si vous avez des questions ou besoin d'assistance supplémentaire, veuillez contacter notre équipe de support.<br /><br />
          <strong>Raison de la désactivation :</strong> ${reason}<br /><br />
          Merci de votre compréhension.<br /><br />
          Cordialement,<br />
          UAEM McGill Chapter
        </p>
        <hr />
        <p>
          Dear ${user.displayName},<br /><br />
          We regret to inform you that your account has been deactivated. If you have any questions or need further assistance, please contact our support team.<br /><br />
          <strong>Reason for deactivation:</strong> ${reason}<br /><br />
          Thank you for your understanding.<br /><br />
          Best regards,<br />
          UAEM McGill Chapter
        </p>
      </div>
    `;
    } else {
      emailSubject =
        "Votre compte a été réactivé | Your account has been reactivated";
      emailContent = `
      <div>
        <p>English content follows French</p>
        <p>
          Cher/Chère ${user.displayName},<br /><br />
          Nous sommes heureux de vous informer que votre compte a été réactivé. Vous pouvez maintenant accéder à votre compte et utiliser nos services comme d'habitude. Si vous avez des questions ou besoin d'assistance supplémentaire, veuillez contacter notre équipe de support.<br /><br />
          Merci pour votre patience et votre compréhension.<br /><br />
          Cordialement,<br />
          UAEM McGill Chapter
        </p>
        <hr />
        <p>
          Dear ${user.displayName},<br /><br />
          We are pleased to inform you that your account has been reactivated. You can now access your account and use our services as usual. If you have any questions or need further assistance, please contact our support team.<br /><br />
          Thank you for your patience and understanding.<br /><br />
          Best regards,<br />a
          UAEM McGill Chapter
        </p>
      </div>
    `;
    }

    this.resendService.send({
      to: user.email,
      subject: emailSubject,
      html: emailContent,
    });

    res.status(200).json({
      message: `Successfully set user ${userId} active status to ${user.active}.`,
    });
  });
}
