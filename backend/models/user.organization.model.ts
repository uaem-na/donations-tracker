import { Model, Schema } from "mongoose";
import { Organization, OrganizationUser, UserDocument } from "../types";
import { AddressSchema } from "./schemas";
import UserModel from "./user.model";

const OrganizationSchema: Schema<Organization> = new Schema({
  name: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: true },
});

const OrganizationUserSchema: Schema<OrganizationUser> = new Schema({
  organization: { type: OrganizationSchema, required: true },
});

export const OrganizationUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>(
    "OrganizationUser",
    OrganizationUserSchema
  );
