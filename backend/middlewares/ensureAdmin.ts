import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors";
import { UserDto } from "../models/users";

export const ensureAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    next(new AuthenticationError());
    return;
  }

  const user = UserDto.fromRequest(req);
  user?.isAdmin ? next() : next(new AuthenticationError());
};
