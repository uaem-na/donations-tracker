import { Model, Schema } from "mongoose";
import { UserDocument } from "../types";
import UserModel from "./user.model";

export const AdminUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>("AdminUser", new Schema({}));
