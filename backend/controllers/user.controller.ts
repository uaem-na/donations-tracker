import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";
import { UserDto } from "../models/users";
import { UserService } from "../services";

const log = debug("backend:user");

export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers = expressAsyncHandler(async (req, res, next) => {
    const users = await this.userService.getUsers();
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
}
