import { Model, Schema } from "mongoose";
import { UserDiscriminator, UserRole } from "../../constants";
import { User, UserDocument } from "../../types";
import UserModel from "./user.base.model";

const AdminUserSchema: Schema<User> = new Schema({});

AdminUserSchema.pre("validate", function (next) {
  this.role = UserRole.ADMIN;

  next();
});

export const AdminUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>(
    UserDiscriminator.ADMIN,
    AdminUserSchema
  );
