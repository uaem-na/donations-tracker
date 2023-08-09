import { Model, Schema } from "mongoose";
import { UserDiscriminator, UserRole } from "../../constants";
import { User, UserDocument } from "../../types";
import UserModel from "./user.base.model";

const IndividualUserSchema: Schema<User> = new Schema({});

IndividualUserSchema.pre("validate", function (next) {
  this.role = UserRole.INDIVIDUAL;

  next();
});

export const IndividualUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>(
    UserDiscriminator.INDIVIDUAL,
    IndividualUserSchema
  );
