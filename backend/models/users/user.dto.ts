import { Document } from "mongoose";
import { Location, OrganizationUser, User } from "../../types";

export class UserDto {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  location: Location;

  // * used for authorization, a user can have a maximum of one of these roles
  isAdmin = false;
  isOrganization = false;
  isOrganizationVerified = false;
  isIndividual = false;
  isDangling = false;

  private constructor(id: string, user: User) {
    const { username, email, firstName, lastName, location } = user;

    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;

    // * set a user's role and send it to frontend for session persistence
    if (!user.kind) {
      this.isDangling = true;
      return;
    }

    if (user.kind.toUpperCase() === "DanglingUser".toUpperCase()) {
      this.isDangling = true;
    } else if (user.kind.toUpperCase() === "AdminUser".toUpperCase()) {
      this.isAdmin = true;
    } else if (user.kind.toUpperCase() === "OrganizationUser".toUpperCase()) {
      const orgUser = user as OrganizationUser;
      this.isOrganization = true;
      this.isOrganizationVerified = orgUser.organization.verified;
    } else if (user.kind.toUpperCase() === "IndividualUser".toUpperCase()) {
      this.isIndividual = true;
    }
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
