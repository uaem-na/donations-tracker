import debug from "debug";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ParamsDictionary } from "express-serve-static-core";
import { body } from "express-validator";
import passport from "passport";
import QueryString from "qs";
import { UserDiscriminator } from "../constants";
import { InvalidOperationError } from "../errors";
import { IndividualUserModel, UserDto, UserModel } from "../models/users";
import { AuthService } from "../services";

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
        .json(this.authService.getSession(req) || { error: "Login failed." });
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
    await body("type").notEmpty().run(req);
    await body("username").notEmpty().run(req);
    await body("email").notEmpty().isEmail().run(req);
    await body("firstName").notEmpty().run(req);
    await body("lastName").notEmpty().run(req);
    await body("password").notEmpty().run(req);

    const { type } = req.body;

    if (type === UserDiscriminator.ORGANIZATION) {
      await body("address").notEmpty().run(req);
    }

    switch (type) {
      case UserDiscriminator.INDIVIDUAL:
        await this.registerIndividualUser(req, res, next);
        break;

      case UserDiscriminator.ORGANIZATION:
        break;
    }
  });

  private async registerIndividualUser<P, ResBody, ReqBody, ReqQuery>(
    req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>,
    res: Response,
    next: NextFunction
  ) {
    const { username, email, firstName, lastName, password } = req.body;
    const user = await UserModel.register(
      new IndividualUserModel({
        username,
        email,
        firstName,
        lastName,
      }),
      password
    );

    passport.authenticate("local")(req, res, () => {
      req.session.save((err) => {
        if (err) {
          return next(err);
        }
        log(`User ${user.id} registered.`);
        res.status(200).json(UserDto.fromDocument(user));
      });
    });
  }
}
