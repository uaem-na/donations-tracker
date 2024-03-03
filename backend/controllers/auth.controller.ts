/* eslint-disable @typescript-eslint/no-explicit-any */
import debug from "debug";
import { Request } from "express";
import expressAsyncHandler from "express-async-handler";
import { ParamsDictionary } from "express-serve-static-core";
import { body, param, query, validationResult } from "express-validator";
import passport from "passport";
import QueryString from "qs";
import { ProvinceCode, ProvinceName, UserDiscriminator } from "../constants";
import { InvalidOperationError } from "../errors";
import {
  IndividualUserModel,
  OrganizationUserModel,
  UserDto,
  UserModel,
} from "../models/users";
import { AuthService, ResendService } from "../services";
import { UserDocument } from "../types";
import {
  validateUserRegisterBase,
  validateUserRegisterOrg,
} from "./validators";

const log = debug("backend:auth");

export class AuthController {
  constructor(
    private authService: AuthService,
    private resendService: ResendService,
  ) {}

  getSession = expressAsyncHandler(async (req, res, next) => {
    const session = this.authService.getSession(req);

    session && log(`session.id: ${session.id}`);

    if (session) {
      res.status(200).json(session);
    } else {
      // ! explicitly send 200 to allow anon users
      res.status(200).json(false);
    }
  });

  localStrategy = expressAsyncHandler(async (req, res, next) => {
    await body("username").notEmpty().run(req);
    await body("password").notEmpty().run(req);

    passport.authenticate("local", {
      successFlash: true, // save success message to flash
      failureFlash: true, // save error messsage to flash
      failWithError: true, // pass error to next middleware
      passReqToCallback: true,
    })(req, res, next);
  });

  login = expressAsyncHandler(async (req, res, next) => {
    req.session.save((err) => {
      if (err) {
        log(`Error saving session: ${err}`);
        return next(err);
      }

      log(`User ${req.user?.id} logged in.`);

      res
        .status(200)
        .json(this.authService.getSession(req) ?? { error: "Login failed." });
    });
  });

  logout = expressAsyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new InvalidOperationError("User is not logged in.");
    }

    const { id } = req.user;

    req.logout((err) => {
      // callback is required for req.logout
      if (err) {
        return next(err);
      }
    });

    req.session.save((err) => {
      if (err) {
        return next(err);
      }

      log(`User ${id} logged out.`);

      res.status(200).json({ message: "Successfully logged out." });
    });
  });

  register = expressAsyncHandler(async (req, res, next) => {
    const { type } = req.body;

    await validateUserRegisterBase({ req, optional: false });

    if (type === UserDiscriminator.ORGANIZATION) {
      await validateUserRegisterOrg({ req, optional: false });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    let user: UserDocument | undefined;

    switch (type) {
      case UserDiscriminator.INDIVIDUAL:
        user = await this.registerIndividualUser(req);
        break;

      case UserDiscriminator.ORGANIZATION:
        user = await this.registerOrganizationUser(req);
        break;
    }

    if (user) {
      passport.authenticate("local")(req, res, () => {
        req.session.save((err) => {
          if (err) {
            return next(err);
          }
          if (user === undefined) {
            throw new InvalidOperationError("User is undefined.");
          }
          log(`User ${user.id} registered.`);
          res.status(200).json(UserDto.fromDocument(user));
        });
      });
    } else {
      res.status(500).json("Unable to create user");
    }
  });

  verifyEmail = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);
    await query("token").notEmpty().run(req);

    const { id } = req.params;
    const { token } = req.query;
    if (!token) {
      res.status(401).json({ message: "Invalid token." });
      return;
    }

    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      res.status(403).json({ message: "Could not verify email." });
      return;
    }

    if (
      !user.emailVerificationToken ||
      user.emailVerificationToken.length === 0
    ) {
      res.status(403).json({ message: "Could not verify email." });
      return;
    }

    // TODO: handle this better with timing safe equals to prevent timing attacks
    if (user.emailVerificationToken !== token) {
      res.status(403).json({ message: "Invalid token." });
      return;
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = "";

    await user.save();

    log(`User ${user.id} email verified.`);

    const frontendUrl = process.env.FRONTEND_URL;
    if (frontendUrl) {
      res.redirect(301, `${frontendUrl}`);
      return;
    }

    res.status(200).send("Email verified.");
  });

  resendEmailVerification = expressAsyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new InvalidOperationError("User is not logged in.");
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      throw new InvalidOperationError("User not found.");
    }

    user.emailVerificationToken = this.authService.generateRandomToken();
    await user.save();

    await this.sendEmailVerification({
      userId: user.id,
      email: user.email,
      emailVerificationToken: user.emailVerificationToken,
    });

    res
      .status(200)
      .json({ message: "Email verification link sent to your email." });
  });

  forgotPassword = expressAsyncHandler(async (req, res, next) => {
    await body("email").isEmail().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res
        .status(200)
        .json({ message: "Password reset link sent to your email." });
      return;
    }

    const resetPasswordToken = this.authService.generateRandomToken();

    user.resetPasswordToken = resetPasswordToken;

    await user.save();

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      throw new InvalidOperationError("Frontend URL is not set.");
    }

    const resetPasswordLink = `${frontendUrl}/reset-password/${user.id}?token=${resetPasswordToken}`;

    this.resendService.send({
      to: email,
      subject: "Reset your password",
      html: `Click <a href="${resetPasswordLink}">here</a> to reset your password.`,
    });

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  });

  resetPassword = expressAsyncHandler(async (req, res, next) => {
    await body("userId").notEmpty().run(req);
    await body("token").notEmpty().run(req);
    await body("password").notEmpty().run(req);
    await body("confirmPassword").notEmpty().run(req);

    const { userId, token, password, confirmPassword } = req.body;
    if (!token) {
      res.status(401).json({ message: "Invalid token." });
      return;
    }

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      res.status(403).json({ message: "Could not reset password." });
      return;
    }

    if (!user.resetPasswordToken || user.resetPasswordToken.length === 0) {
      res.status(403).json({ message: "Could not reset password." });
      return;
    }

    if (password !== confirmPassword) {
      res.status(500).json({ message: "Passwords do not match." });
      return;
    }

    // TODO: handle this better with timing safe equals to prevent timing attacks
    if (user.resetPasswordToken !== token) {
      res.status(403).json({ message: "Invalid token." });
      return;
    }

    await user.setPassword(password);
    user.resetPasswordToken = "";

    await user.save();

    log(`User ${user.id} password reset.`);

    res.status(200).json({ message: "Password reset." });
  });

  private async registerIndividualUser(
    req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>,
  ) {
    // * validation already happened in parent function
    const { displayName, username, email, firstName, lastName, password } =
      req.body;

    const emailVerificationToken = this.authService.generateRandomToken();

    const result = await UserModel.register(
      new IndividualUserModel({
        displayName,
        username,
        email,
        firstName,
        lastName,
        emailVerificationToken,
      }),
      password,
    );

    if (!result._id) {
      throw new InvalidOperationError("User _id is not set.");
    }

    await this.sendEmailVerification({
      userId: result._id,
      email,
      emailVerificationToken,
    });

    return result;
  }

  private async registerOrganizationUser(
    req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>,
  ) {
    const {
      displayName,
      username,
      email,
      firstName,
      lastName,
      password,
      phone,
      organization,
      streetAddress,
      postalCode,
      city,
      province,
    } = req.body;

    const emailVerificationToken = this.authService.generateRandomToken();

    const result = await UserModel.register(
      new OrganizationUserModel({
        displayName,
        username,
        email,
        firstName,
        lastName,
        emailVerificationToken,
        organization: {
          name: organization,
          phone,
          address: {
            street: streetAddress,
            postalCode,
            city,
            provinceCode: ProvinceCode[province],
            province: ProvinceName[province],
          },
        },
      }),
      password,
    );

    if (!result._id) {
      throw new InvalidOperationError("User _id is not set.");
    }

    await this.sendEmailVerification({
      userId: result._id,
      email,
      emailVerificationToken,
    });

    return result;
  }

  private async sendEmailVerification({
    userId,
    email,
    emailVerificationToken,
  }: {
    userId: string;
    email: string;
    emailVerificationToken: string;
  }) {
    if (!emailVerificationToken) {
      throw new InvalidOperationError("Email verification token is not set.");
    }

    let backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      backendUrl = "http://localhost:8081";
      log(`backendUrl is not set, using default: ${backendUrl}`);
    }

    const verificationLink = `${backendUrl}/auth/verify/${userId}?token=${emailVerificationToken}`;

    this.resendService.send({
      to: email,
      subject: "Please verify your email address",
      html: `Click <a href="${verificationLink}">here</a> to verify your email address.`,
    });
  }
}
