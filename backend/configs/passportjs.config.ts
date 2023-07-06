import debug from "debug";
import { Express } from "express";
import passport from "passport";
import { UserModel } from "../models/users";

const log = debug("backend:passportjs");

const environment = process.env.NODE_ENV || "development";

export const configurePassportjs = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // set up passport local strategy
  passport.use(UserModel.createStrategy());

  // set up passport local serialization
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser(UserModel.serializeUser() as any);
  passport.deserializeUser(UserModel.deserializeUser());
};
