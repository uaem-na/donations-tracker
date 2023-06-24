import { Request } from "express";
import { UserDto } from "../dtos";

export class AuthService {
  getSession(req: Request): UserDto | null {
    return UserDto.fromRequest(req);
  }
}
