import { FilterPostType } from "../constants";
import { PostModel } from "../models/posts";
import { UserModel } from "../models/users";
import { PostDocument, User, UserDocument } from "../types";

export class UserService {
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

  async setActive(id: string, active: boolean): Promise<UserDocument> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error(`Error updating user. User does not exist.`);
    }

    user.active = active;

    return await user.save();
  }

  async getStarredPosts(
    id: string,
    page: number,
    perPage: number,
    type: FilterPostType = FilterPostType.ALL
  ): Promise<PostDocument[]> {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error(`Error getting starred posts. User does not exist.`);
    }

    if (!user.starred || user.starred.length === 0) {
      return [];
    }

    const starredPostIds = user?.starred.map((oid) => oid.toString());

    // TODO: this code is repeated in post.service.ts and user.service.ts (refactor?)
    if (perPage && page) {
      const posts = await PostModel.find({
        ...(type !== FilterPostType.ALL && { type: type }),
        _id: { $in: starredPostIds },
      })
        .sort({ updatedAt: -1, createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate("author", "firstName lastName userName -__t");

      return posts;
    }

    const posts = await PostModel.find({
      ...(type !== FilterPostType.ALL && { type: type }),
      _id: { $in: starredPostIds },
    })
      .sort({ updatedAt: -1, createdAt: -1 })
      .populate("author", "firstName lastName userName -__t");

    return posts;
  }
}
