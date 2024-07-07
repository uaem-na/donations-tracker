import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";
import { FilterQuery } from "mongoose";
import { PostDto } from "../models/posts";
import { UserDto } from "../models/users";
import { PostService, UserService } from "../services";
import { PaginatedResponse, PostDocument } from "../types";
import { tryParsePaginationQuery, tryParsePostFilterQuery } from "../utils";
import {
  validatePaginationRequest,
  validatePostsFilterRequest,
  validateUpdatePassword,
  validateUpdateUserInfo,
} from "./validators";

const log = debug("backend:user");

export class UserController {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  getAllUsers = expressAsyncHandler(async (req, res, next) => {
    const users = await this.userService.getUsers(false);
    const userDtos = users.map((user) => UserDto.fromDocument(user));

    res.json(userDtos || []);
  });

  updateUser = expressAsyncHandler(async (req, res, next) => {
    await validateUpdateUserInfo({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { displayName, firstName, lastName } = req.body;
    const updatedUser = await this.userService.updateUser(req.user!.id, {
      displayName,
      firstName,
      lastName,
    });

    log(`Updated user ${req.user!.id}.`);

    res.status(200).json(UserDto.fromDocument(updatedUser));
  });

  updatePassword = expressAsyncHandler(async (req, res, next) => {
    await validateUpdatePassword({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { password, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      res.status(400).json({
        error: `Error updating user password. New passwords must match.`,
      });
      return;
    }

    const currentUser = req.user as UserDto;
    const currentUserId = currentUser.id;
    const updatedUser = await this.userService.updatePassword(
      currentUserId,
      password,
      newPassword,
    );

    log(`Updated password for user ${currentUserId}.`);

    res.status(200).json(UserDto.fromDocument(updatedUser));
  });

  deleteUser = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ error: `Error deleting user. User ID must be specified.` });
      return;
    }

    await this.userService.deleteUser(id);

    log(`Deleted user ${id}.`);

    res.status(200).json({ message: `Successfully deleted user ${id}.` });
  });

  verifyUser = expressAsyncHandler(async (req, res, next) => {
    await body("userId").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
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

    log(`Verified user ${userId}.`);

    res.status(200).json({ message: `Successfully verified user ${userId}.` });
  });

  setActive = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const { active } = req.body;
    if (!id) {
      res.status(400).json({
        error: `Error setting user active status. User ID must be specified.`,
      });
      return;
    }

    await this.userService.toggleActive(id);

    log(`Set user ${id} active status to ${active}.`);

    res.status(200).json({
      message: `Successfully set user ${id} active status to ${active}.`,
    });
  });

  getStarredPosts = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);
    await validatePaginationRequest({
      req,
      optional: false,
    });
    await validatePostsFilterRequest({
      req,
      optional: false,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: `Error getting starred posts. User ID must be specified.`,
      });
      return;
    }

    const postIds = await this.userService.getUserStarredPostIds(id);

    // if user doesn't have any starred posts, return early
    if (postIds.length === 0) {
      res.json([]);
      return;
    }

    const { page, limit } = tryParsePaginationQuery(req);
    const { postType, userType, categories } = tryParsePostFilterQuery(req);

    const filterQuery: FilterQuery<PostDocument> = {
      _id: { $in: postIds },
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
}
