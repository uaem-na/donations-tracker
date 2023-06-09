import { UserModel } from "../models/users";
import { User, UserDocument } from "../types";

export class UserService {
  /**
   * Get all active users, optionally get all users when active is set to false
   * @param active set to false to get all users including inactive users
   * @returns returns a list of users
   */
  async getUsers(active = true): Promise<UserDocument[]> {
    const users = await UserModel.find({
      active,
    });

    return users;
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    const user = await UserModel.findById(id);

    return user;
  }

  async getUserByUsername(username: string): Promise<UserDocument | null> {
    const user = await UserModel.findByUsername(username, false);

    return user;
  }

  async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<UserDocument> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error(`Error updating user. User does not exist.`);
    }

    return (await user.changePassword(
      oldPassword,
      newPassword
    )) as UserDocument;
  }

  async updateUser(id: string, update: Partial<User>): Promise<UserDocument> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error(`Error updating user. User does not exist.`);
    }

    Object.assign(user, update);

    return await user.save();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await UserModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error(`Error deleting user ${id}.`);
    }
  }

  async verifyOrgniazationUser(id: string): Promise<UserDocument> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error(`Error verifying user. User does not exist.`);
    }

    user.organization.verified = true;

    return await user.save();
  }
}
