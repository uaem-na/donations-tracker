import { User } from "../models/user.model";
import { IUser, IUserDocument } from "../types";

export class UserService {
  async getUsers(): Promise<IUserDocument[]> {
    const users = await User.find({
      active: true,
    });

    return users;
  }

  async getUser(id: string): Promise<IUserDocument | null> {
    const user = await User.findById(id);

    return user;
  }

  async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<IUserDocument> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error(`Error updating user. User does not exist.`);
    }

    return (await user.changePassword(
      oldPassword,
      newPassword
    )) as IUserDocument;
  }

  async updateUser(id: string, update: Partial<IUser>): Promise<IUserDocument> {
    const user = await this.getUser(id);

    if (!user) {
      throw new Error(`Error updating user. User does not exist.`);
    }

    Object.assign(user, update);

    return await user.save();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error(`Error deleting user ${id}.`);
    }
  }
}
