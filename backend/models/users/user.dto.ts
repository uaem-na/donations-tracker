import { Document } from "mongoose";
import { Location, User } from "../../types";

type UserLocationDto = Omit<Location, "_id"> & {
  id: string;
};

export class UserDto {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  location: UserLocationDto | undefined;
  role: string;
  active: boolean;

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
      // convert location._id to location.id
      const { _id: locationId, ...rest } = location;
      this.location = {
        id: locationId,
        ...rest,
      };
    }
  }

  static fromDocument(document: Document): UserDto {
    const user = document.toObject() as User;
    return new UserDto(document.id, user);
  }

  static fromRequest(req: Express.Request): UserDto | null {
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
