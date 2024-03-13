import { randomBytes } from "crypto";
import { Request } from "express";
import { UserDto } from "../models/users";

export class AuthService {
  /**
   * Retrieves the user session from the request object.
   * @param req - The request object.
   * @returns The user session as a UserDto object, or null if no session is found.
   */
  getSession(req: Request): UserDto | null {
    return UserDto.fromRequest(req);
  }

  /**
   * Generates a random token.
   *
   * @returns A string representing the random token.
   */
  generateRandomToken(): string {
    return randomBytes(64).toString("hex");
  }
}
