/* eslint-disable @typescript-eslint/no-explicit-any */
import debug from "debug";
import { Request } from "express";
import expressAsyncHandler from "express-async-handler";
import { ParamsDictionary } from "express-serve-static-core";
import { body, validationResult } from "express-validator";
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
import { AuthService } from "../services";
import { UserDocument } from "../types";
import {
  validateUserRegisterBase,
  validateUserRegisterOrg,
} from "./validators";

const log = debug("backend:auth");

export class AuthController {
  constructor(private authService: AuthService) {}

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

  private async registerIndividualUser(
    req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>
  ) {
    // * validation already happened in parent function
    const { displayName, username, email, firstName, lastName, password } =
      req.body;
    return await UserModel.register(
      new IndividualUserModel({
        displayName,
        username,
        email,
        firstName,
        lastName,
      }),
      password
    );
  }

  private async registerOrganizationUser(
    req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>
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

    return await UserModel.register(
      new OrganizationUserModel({
        displayName,
        username,
        email,
        firstName,
        lastName,
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
      password
    );
  }
}
