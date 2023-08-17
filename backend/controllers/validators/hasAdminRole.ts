import { Request } from "express";
import { UserRole } from "../../constants";
import { AuthorizationError } from "../../errors";
import { UserDto } from "../../models/users";

export const hasAdminRole = (
  req: Request
): req is Request & { user: UserDto } => {
  const userId = req.user?.id;
  if (!userId) {
    throw new AuthorizationError("Unauthorized");
  }

  const user = UserDto.fromRequest(req);

  return user?.role === UserRole.ADMIN;
};
