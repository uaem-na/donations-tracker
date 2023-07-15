import { faker } from "@faker-js/faker/locale/en_CA";
import { UserModel } from "../models/users";
import { fakeAdminUser } from "../models/users/user.admin.model";
import { fakeIndividualUser } from "../models/users/user.individual.model";
import { fakeOrganizationUser } from "../models/users/user.organization.model";
import { UserDocument } from "../types.js";

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
