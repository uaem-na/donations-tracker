import { faker } from "@faker-js/faker/locale/en_CA";
import { Model, Schema } from "mongoose";
import { UserDiscriminator, UserRole } from "../../constants";
import { Organization, OrganizationUser, UserDocument } from "../../types";
import { AddressSchema } from "../common";
import UserModel from "./user.base.model";

const OrganizationSchema: Schema<Organization> = new Schema({
  name: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: false },
  verified: { type: Boolean, default: false, required: true },
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

export const fakeOrganizationUser = async (
  username: string,
  password: string
): Promise<UserDocument> => {
  const user = new OrganizationUserModel({
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    email: faker.internet.email(),
    username: username,
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      postalCode: faker.location.zipCode(), // * note postalCodes won't match
    },
    organization: {
      name: faker.company.name(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        province: faker.location.state(), // * note that province & its code won't match
        provinceCode: faker.location.state({ abbreviated: true }),
        postalCode: faker.location.zipCode(),
      },
      phone: faker.phone.number(),
      type: faker.word.noun(),
    },
    role: UserRole.ORGANIZATION,
  });

  await user.setPassword(password);

  return user;
};
