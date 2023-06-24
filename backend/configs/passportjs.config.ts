import debug from "debug";
import { Express } from "express";
import passport from "passport";
import { User } from "../models/user.model";

const log = debug("backend:passportjs");

const environment = process.env.NODE_ENV || "development";

export const configurePassportjs = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // set up passport local strategy
  passport.use(User.createStrategy());

  // set up passport local serialization
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser(User.serializeUser() as any);
  passport.deserializeUser(User.deserializeUser());
};
