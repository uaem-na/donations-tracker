import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  }

  const error = new AuthenticationError();
  next(error);
};
