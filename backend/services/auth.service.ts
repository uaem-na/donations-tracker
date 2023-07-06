import { Request } from "express";
import { UserDto } from "../models/users";

export class AuthService {
  getSession(req: Request): UserDto | null {
    return UserDto.fromRequest(req);
  }
}
