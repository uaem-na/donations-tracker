import debug from "debug";
import { Express } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/users";

const log = debug("backend:passportjs");

const environment = process.env.NODE_ENV || "development";

export const configurePassportjs = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // set up passport local strategy
  const authenticate = UserModel.authenticate();
  passport.use(
    new LocalStrategy((username, password, cb) => {
      authenticate(username, password, (err, user, error) => {
        if (err) {
          return cb(err);
        }

        if (user && typeof user === "object" && !user.active) {
          log(`User ${user.username} is not active`);
          return cb(null, false, { message: "errors.inactive_user" });
        }

        cb(null, user as any, error);
      });
    }),
  );

  // set up passport local serialization
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser(UserModel.serializeUser() as any);
  passport.deserializeUser(UserModel.deserializeUser());
};
