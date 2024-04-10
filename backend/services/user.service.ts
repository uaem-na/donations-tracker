/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, SortOrder } from "mongoose";
import { UserModel } from "../models/users";
import { User, UserDocument } from "../types";

export class UserService {
  async getPaginatedUsers(
    page: number,
    limit: number,
    filter: FilterQuery<UserDocument> = {},
    sort:
      | string
      | { [key: string]: SortOrder | { $meta: "textScore" } }
      | [string, SortOrder][]
      | null
      | undefined = {}
  ): Promise<[UserDocument[], number]> {
    if (!page || !limit || page < 0 || limit < 0) {
      throw new Error("Error paginating users. Invalid page or limit.");
    }

    const posts = await UserModel.find({
      ...(filter && { ...filter }),
    })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    return [posts, await UserModel.countDocuments(filter)];
  }

  async toggleReported(id: string): Promise<UserDocument> {
    const user = await UserModel.findOneAndUpdate({ _id: id }, [
      { $set: { reported: { $eq: [false, "$reported"] } } },
    ]);
    if (!user) {
      throw new Error(
        `Error toggling reported for id(${id}). User does not exist.`
      );
    }

    return user;
  }

  /**
   * Get all active users, optionally get all users when active is set to false
   * @param filterInactive set to false to get all users including inactive users
   * @returns returns a list of users
   */
  async getUsers(filterInactive = true): Promise<UserDocument[]> {
    if (filterInactive) {
      return await UserModel.find({ active: true });
    }

    return await UserModel.find();
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

  async toggleActive(id: string): Promise<UserDocument> {
    const user = await UserModel.findOneAndUpdate({ _id: id }, [
      { $set: { active: { $eq: [false, "$active"] } } },
    ], { new: true });
    
    if (!user) {
      throw new Error(
        `Error toggling active for id(${id}). User does not exist.`
      );
    }

    return user;
  }

  async getUserStarredPostIds(userId: string): Promise<string[]> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error(`Error getting starred posts. User does not exist.`);
    }

    if (!user.starred || user.starred.length === 0) {
      return [];
    }

    const starredPostIds: string[] = user?.starred.map(
      (oid: { toString: () => string }) => oid.toString()
    );

    return starredPostIds;
  }
}
