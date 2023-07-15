import { faker } from "@faker-js/faker/locale/en_CA";
import { Model, Schema } from "mongoose";
import { UserDiscriminator, UserRole } from "../../constants";
import { UserDocument } from "../../types";
import UserModel from "./user.base.model";

const AdminUserSchema: Schema<UserDocument> = new Schema({});

AdminUserSchema.pre("validate", function (next) {
  this.role = UserRole.ADMIN;

  next();
});

export const AdminUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>(
    UserDiscriminator.ADMIN,
    AdminUserSchema
  );

export const fakeAdminUser = async (
  username: string,
  password: string
): Promise<UserDocument> => {
  const user = new AdminUserModel({
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    email: faker.internet.email(),
    username: username,
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      postalCode: faker.location.zipCode(),
    },
    role: UserRole.ADMIN,
  });

  await user.setPassword(password);

  return user;
};
