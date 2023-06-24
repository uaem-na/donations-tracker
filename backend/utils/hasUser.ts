import { Request } from "express";
import { UserDto } from "../dtos";

export const hasUser = (req: Request): req is Request & { user: UserDto } => {
  return Boolean(
    req.user && req.user.id && req.user.username && req.user.email
  );
};
