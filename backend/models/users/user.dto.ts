import { Document } from "mongoose";
import { Location, User } from "../../types";

export class UserDto {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  location: Location;

  private constructor(id: string, user: User) {
    const { username, email, firstName, lastName, verified, location } = user;

    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.verified = verified;
    this.location = location;
  }

  static fromDocument(document: Document): UserDto {
    const user = document.toObject() as User;
    return new UserDto(document.id, user);
  }

  static fromRequest(req: Express.Request): UserDto | null {
    if (!req.user || !req.user.id || !req.user.username || !req.user.email) {
      return null;
    }

    const user = req.user as unknown as User;
    return new UserDto(req.user.id, user);
  }
}