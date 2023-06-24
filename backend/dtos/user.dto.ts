import { Document } from "mongoose";
import { IUser } from "../types";

export class UserDto {
  id?: string;
  admin: boolean;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  verified: boolean;

  private constructor(id: string, user: IUser) {
    const {
      admin,
      username,
      email,
      firstName,
      lastName,
      organization,
      verified,
    } = user;
    this.id = id;
    this.username = username;
    this.admin = admin;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.organization = organization;
    this.verified = verified;
  }

  static fromDocument(document: Document): UserDto {
    const user = document.toObject() as IUser;
    return new UserDto(document.id, user);
  }

  static fromRequest(req: Express.Request): UserDto | null {
    if (!req.user || !req.user.id) {
      return null;
    }

    const user = req.user as unknown as IUser;
    return new UserDto(req.user.id, user);
  }
}
