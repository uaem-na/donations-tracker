import { faker } from "@faker-js/faker/locale/en_CA";
import { UserRole } from "../constants";
import {
  AdminUserModel,
  IndividualUserModel,
  OrganizationUserModel,
  UserModel,
} from "../models/users";
import { UserDocument } from "../types.js";

export const fakeAdminUser = async (
  username: string,
  password: string
): Promise<UserDocument> => {
  const user = new AdminUserModel({
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    email: faker.internet.email(),
    username: username,
    displayName: faker.internet.displayName(),
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

export const fakeOrganizationUser = async (
  username: string,
  password: string
): Promise<UserDocument> => {
  const user = new OrganizationUserModel({
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    email: faker.internet.email(),
    username: username,
    displayName: faker.internet.displayName(),
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

export const fakeIndividualUser = async (
  username: string,
  password: string
): Promise<UserDocument> => {
  const user = new IndividualUserModel({
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    email: faker.internet.email(),
    displayName: faker.internet.displayName(),
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

export const seedUsers = async (
  destroy: boolean,
  count: number
): Promise<UserDocument[]> => {
  if (destroy) {
    console.log("🚀 ~ file: seed.users.ts ~ seedUsers ~ destroy:", destroy);
    // delete the whole collection
    await UserModel.deleteMany({});
  }

  const users: UserDocument[] = [];
  const length = await UserModel.countDocuments();
  if (length === 0) {
    // default password for all test users
    const defaultPassword = "Test1234!";

    // create random admin users
    for (let i = 0; i < count; i++) {
      const username = i === 0 ? "admin" : `admin${i}`;

      const user = await fakeAdminUser(username, defaultPassword);

      users.push(user);
    }

    // create random individual users (default)
    for (let i = 0; i < count; i++) {
      const user = await fakeIndividualUser(
        faker.internet.userName(),
        defaultPassword
      );

      users.push(user);
    }

    // create random organization users
    for (let i = 0; i < count; i++) {
      const user = await fakeOrganizationUser(
        faker.internet.userName(),
        defaultPassword
      );

      users.push(user);
    }

    const ops = users.map((doc) => ({
      insertOne: { document: doc },
    }));
    const result = await UserModel.bulkWrite(ops);
    const added = result.insertedCount;
    console.log("🚀 ~ file: seed.users.ts ~ seedUsers ~ added:", added);
  }

  return users;
};
