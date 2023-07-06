import { Model, Schema } from "mongoose";
import { IndividualUser, UserDocument } from "../../types";
import UserModel from "./user.model";

const IndividualUserSchema: Schema<IndividualUser> = new Schema({});

export const IndividualUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>("IndividualUser", IndividualUserSchema);
