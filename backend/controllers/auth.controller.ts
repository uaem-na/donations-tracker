import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body } from "express-validator";
import passport from "passport";
import { UserDto } from "../dtos";
import { InvalidOperationError } from "../errors";
import { User } from "../models/user.model";
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
      res.status(200).json({ error: "Not logged in." });
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
    await body("username").notEmpty().run(req);
    await body("email").notEmpty().isEmail().run(req);
    await body("firstName").notEmpty().run(req);
    await body("lastName").notEmpty().run(req);
    await body("organization").notEmpty().run(req);
    await body("password").notEmpty().run(req);

    const { username, email, firstName, lastName, organization, password } =
      req.body;
    const user = await User.register(
      new User({
        username,
        email,
        firstName,
        lastName,
        organization,
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
  });
}
