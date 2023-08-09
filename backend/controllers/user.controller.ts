import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, query, validationResult } from "express-validator";
import { FilterPostType, FilterablePostTypes } from "../constants";
import { PostDto } from "../models/posts";
import { UserDto } from "../models/users";
import { UserService } from "../services";
import { isEnumValue } from "../utils/isEnumValue";

const log = debug("backend:user");

export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers = expressAsyncHandler(async (req, res, next) => {
    const users = await this.userService.getUsers(false);
    const userDtos = users.map((user) => UserDto.fromDocument(user));

    res.json(userDtos || []);
  });

  updateUser = expressAsyncHandler(async (req, res, next) => {
    await body("firstName").notEmpty().run(req);
    await body("lastName").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { firstName, lastName } = req.body;
    const currentUser = req.user as UserDto;
    const currentUserId = currentUser.id as string;
    const updatedUser = await this.userService.updateUser(currentUserId, {
      firstName,
      lastName,
    });

    log(`Updated user ${currentUserId}.`);

    res.status(200).json(UserDto.fromDocument(updatedUser));
  });

  updatePassword = expressAsyncHandler(async (req, res, next) => {
    await body("password").notEmpty().run(req);
    await body("newPassword").notEmpty().run(req);
    await body("confirmNewPassword").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
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
    const currentUserId = currentUser.id as string;
    const updatedUser = await this.userService.updatePassword(
      currentUserId,
      password,
      newPassword
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

    await this.userService.verifyOrgniazationUser(userId);

    log(`Verified user ${userId}.`);

    res.status(200).json({ message: `Successfully verified user ${userId}.` });
  });

  setActive = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);
    await body("active").notEmpty().run(req);

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

    await this.userService.setActive(id, active);

    log(`Set user ${id} active status to ${active}.`);

    res.status(200).json({
      message: `Successfully set user ${id} active status to ${active}.`,
    });
  });

  getStarredPosts = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);
    await query("page")
      .optional()
      .isInt({
        min: 1,
        allow_leading_zeroes: false,
      })
      .run(req);
    await query("per_page")
      .optional()
      .isInt({
        min: 1,
        allow_leading_zeroes: false,
      })
      .run(req);
    await query("type").optional().isIn(FilterablePostTypes).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: `Error getting starred posts. User ID must be specified.`,
      });
      return;
    }

    const type = req.query.type as string;
    const filterByPostType = isEnumValue(type, FilterPostType)
      ? type
      : FilterPostType.ALL;
    const page = parseInt(req.query.page as string) ?? 1;
    const perPage = parseInt(req.query.per_page as string) ?? 10;

    const posts = await this.userService.getStarredPosts(
      id,
      page,
      perPage,
      filterByPostType
    );
    const postDtos = posts.map((post) => PostDto.fromDocument(post));

    res.status(200).json(postDtos);
  });
}
