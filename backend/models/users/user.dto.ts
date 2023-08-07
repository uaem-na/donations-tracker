import { Request } from "express";
import { Document } from "mongoose";
import { Location, User } from "../../types";
import { LocationDto } from "../common";

type UserLocationDto = Omit<Location, "_id"> & {
  id: string;
};

export class UserDto {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
  location: UserLocationDto | undefined;
  starred: string[] | undefined;

  private constructor(id: string, user: User) {
    const { username, email, firstName, lastName, location, role } = user;

    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.active = user.active;

    if (location) {
      this.location = LocationDto.fromLocation(location);
    }

    if (user.starred && user.starred.length > 0) {
      this.starred = user.starred.map((post) => {
        return post._id;
      });
    }
  }

  static fromDocument(document: Document): UserDto {
    const user = document.toObject() as User;
    return new UserDto(document.id, user);
  }

  static fromRequest(req: Request): UserDto | null {
    if (!req.user?.id || !req.user.username || !req.user.email) {
      return null;
    }

    const user = req.user as unknown as User;
    return new UserDto(req.user.id, user);
  }

  static fromUser(user: User): UserDto {
    return new UserDto(user._id, user);
  }
}
