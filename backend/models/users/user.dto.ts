import { Request } from "express";
import { Document } from "mongoose";
import { UserRole } from "../../constants";
import {
  Location,
  LocationDocument,
  OrganizationUser,
  User,
  UserDocument,
} from "../../types";
import { LocationDto } from "../common";

type UserLocationDto = Omit<Location, "_id"> & {
  id: string;
};

export class UserDto {
  id: string;
  displayName: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
  location: UserLocationDto | undefined;
  starred: string[] | undefined;
  isEmailVerified: boolean;
  verified: boolean | undefined;
  organization:
    | {
        name: string;
        address: {
          street: string;
          city: string;
          province: string;
          provinceCode: string;
          postalCode: string;
          country: string;
          countryCode: string;
        };
        phone: string;
        type: string;
        verified: boolean;
      }
    | undefined;

  private constructor(id: string, user: User | OrganizationUser) {
    const {
      displayName,
      username,
      email,
      firstName,
      lastName,
      location,
      role,
    } = user;

    this.id = id;
    this.displayName = displayName;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.active = user.active;
    this.verified = true;
    this.isEmailVerified = user.isEmailVerified ?? false;

    if (role === UserRole.ORGANIZATION && "organization" in user) {
      this.verified = user.organization.verified;
      this.organization = {
        name: user.organization.name,
        address: {
          ...user.organization.address,
        },
        phone: user.organization.phone,
        type: user.organization.type,
        verified: user.organization.verified,
      };
    }

    if (location) {
      this.location = LocationDto.fromLocationDocument(
        location as LocationDocument,
      );
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

  static fromUserDocument(user: UserDocument): UserDto | null {
    if (user) {
      return new UserDto(user._id, user);
    }
    return null;
  }
}
