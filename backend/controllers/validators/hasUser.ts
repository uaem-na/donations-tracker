import { Request } from "express";
import { UserDto } from "../../models/users";

export const hasUser = (req: Request): req is Request & { user: UserDto } => {
  return Boolean(req.user?.id && req.user?.username && req.user?.email);
};
