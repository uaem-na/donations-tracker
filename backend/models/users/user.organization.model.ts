import { Model, Schema } from "mongoose";
import { UserDiscriminator, UserRole } from "../../constants";
import { Organization, OrganizationUser, UserDocument } from "../../types";
import { AddressSchema } from "../common";
import UserModel from "./user.base.model";

const OrganizationSchema: Schema<Organization> = new Schema({
  name: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: true },
  verified: { type: Boolean, default: false, required: true },
});

const OrganizationUserSchema: Schema<OrganizationUser> = new Schema({
  organization: { type: OrganizationSchema, required: true },
  isOrganization: { type: Boolean, default: true },
});

OrganizationUserSchema.pre("validate", function (next) {
  this.role = UserRole.ORGANIZATION;

  next();
});

export const OrganizationUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>(
    UserDiscriminator.ORGANIZATION,
    OrganizationUserSchema
  );
