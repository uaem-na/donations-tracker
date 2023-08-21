import { Model, Schema } from "mongoose";
import { UserDiscriminator, UserRole } from "../../constants";
import { Organization, OrganizationUser, UserDocument } from "../../types";
import { AddressSchema } from "../common";
import UserModel from "./user.base.model";

const OrganizationSchema: Schema<Organization> = new Schema({
  name: { type: String, minlength: 3, maxlength: 1024, required: true },
  phone: { type: String, minlength: 10, maxlength: 20, required: true },
  verified: { type: Boolean, default: false, required: true },
  address: { type: AddressSchema, required: true },
});

const OrganizationUserSchema: Schema<OrganizationUser> = new Schema({
  organization: { type: OrganizationSchema, required: true },
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
