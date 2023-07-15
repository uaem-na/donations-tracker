import { Model, Schema } from "mongoose";
import { UserDiscriminator, UserRole } from "../../constants";
import { IndividualUser, UserDocument } from "../../types";
import UserModel from "./user.base.model";

const IndividualUserSchema: Schema<IndividualUser> = new Schema({
  isIndividual: { type: Boolean, default: true },
});

IndividualUserSchema.pre("validate", function (next) {
  this.role = UserRole.INDIVIDUAL;

  next();
});

export const IndividualUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>(
    UserDiscriminator.INDIVIDUAL,
    IndividualUserSchema
  );
