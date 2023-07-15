import { faker } from "@faker-js/faker/locale/en_CA";
import { Model, Schema } from "mongoose";
import { UserDiscriminator, UserRole } from "../../constants";
import { IndividualUser, UserDocument } from "../../types";
import UserModel from "./user.base.model";

const IndividualUserSchema: Schema<IndividualUser> = new Schema({});

IndividualUserSchema.pre("validate", function (next) {
  this.role = UserRole.INDIVIDUAL;

  next();
});

export const IndividualUserModel: Model<UserDocument> =
  UserModel.discriminator<UserDocument>(
    UserDiscriminator.INDIVIDUAL,
    IndividualUserSchema
  );

export const fakeIndividualUser = async (
  username: string,
  password: string
): Promise<UserDocument> => {
  const user = new IndividualUserModel({
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    email: faker.internet.email(),
    username: username,
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      postalCode: faker.location.zipCode(),
    },
    role: UserRole.INDIVIDUAL,
  });

  await user.setPassword(password);

  return user;
};
