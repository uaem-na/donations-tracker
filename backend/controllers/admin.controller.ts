import { debug } from "debug";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { FilterQuery } from "mongoose";
import { PostStatus } from "../constants";
import { AuthorizationError } from "../errors";
import { PostDto } from "../models/posts";
import { UserDto } from "../models/users";
import { PostService, UserService } from "../services";
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
  validateUserId,
  validateUsersFilterRequest,
} from "./validators";

const log = debug("backend:admin");

export class AdminController {
  constructor(
    private postService: PostService,
    private userService: UserService
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
    const { postType, userType, categories } = tryParsePostFilterQuery(req);

    const filterQuery: FilterQuery<PostDocument> = {
      status: PostStatus.PENDING_APPROVAL,
      ...(postType && { type: postType }),
      ...(userType && { authorType: userType }),
      ...(categories && {
        "item.category": { $in: categories },
      }),
    };

    const [posts, count] = await this.postService.getPaginatedPosts(
      page,
      limit,
      filterQuery,
      { updatedAt: -1, createdAt: -1 }
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

    const { page, limit } = tryParsePaginationQuery(req);
    const { userType } = tryParseUserFilterQuery(req);

    const filterQuery: FilterQuery<UserDocument> = {
      ...(userType && { role: userType }),
    };

    const [users, count] = await this.userService.getPaginatedUsers(
      page,
      limit,
      filterQuery,
      { updatedAt: -1, createdAt: -1 }
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

    await this.postService.approvePost(postId);

    log(`${req.user?.id} approved post ${postId}.`);

    res.status(200).json({ message: `Successfully approved post ${postId}.` });
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

    await this.userService.verifyOrgniazationUser(userId);

    log(`${req.user?.id} verified user ${userId}.`);

    res.status(200).json({ message: `Successfully verified user ${userId}.` });
  });

  toggleUserActive = expressAsyncHandler(async (req, res, next) => {
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

    const user = await this.userService.toggleActive(userId);

    log(`${req.user?.id} toggled active for user ${userId} to ${user.active}.`);

    res.status(200).json({
      message: `Successfully set user ${userId} active status to ${user.active}.`,
    });
  });
}
