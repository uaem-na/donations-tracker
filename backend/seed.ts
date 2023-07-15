// seed the database with some data if it's empty
import { faker } from "@faker-js/faker/locale/en_CA";
import { connect, connection } from "mongoose";
import {
  AdminUserModel,
  IndividualUserModel,
  OrganizationUserModel,
  UserModel,
} from "./models/users";
import { UserDocument } from "./types.js";

const connectionString = "mongodb://127.0.0.1:27017/dev";
connect(connectionString);

connection.on("error", console.error.bind(console, "CONNECTION ERROR"));

connection.once("open", async () => {
  console.log(
    `Connected to MongoDB at ${connection.host}:${connection.port}/${connection.db.databaseName}`
  );

  await seed(true);

  // success exit code
  process.exit(0);
});

// seed database
const seed = async (destroy = false) => {
  console.log("Seeding database...");
  const seedUsers = async () => {
    if (destroy) {
      console.log("🚀 ~ file: seed.ts:25 ~ seedUsers ~ destroy:", destroy);
      // delete the whole collection
      await UserModel.deleteMany({});
    }

    const users: UserDocument[] = [];
    const length = await UserModel.countDocuments();
    if (length === 0) {
      // default password for all test users
      const defaultPassword = "Test1234!";

      // default count per role to create
      const defaultCount = 3;

      // create random admin users
      for (let i = 0; i < defaultCount; i++) {
        const adminUsernamePrefix = "admin";

        const user = new AdminUserModel({
          lastName: faker.person.lastName(),
          firstName: faker.person.firstName(),
          email: faker.internet.email(),
          username:
            i === 0 ? adminUsernamePrefix : `${adminUsernamePrefix}${i}`,
        });

        await user.setPassword(defaultPassword);

        users.push(user);
      }

      // create random users
      for (let i = 0; i < defaultCount; i++) {
        const user = new IndividualUserModel({
          lastName: faker.person.lastName(),
          firstName: faker.person.firstName(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
        });

        await user.setPassword(defaultPassword);

        users.push(user);
      }

      // create random organization users
      for (let i = 0; i < defaultCount; i++) {
        const user = new OrganizationUserModel({
          lastName: faker.person.lastName(),
          firstName: faker.person.firstName(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
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
        });

        await user.setPassword(defaultPassword);

        users.push(user);
      }

      const ops = users.map((doc) => ({
        insertOne: { document: doc },
      }));
      const result = await UserModel.bulkWrite(ops);
      const added = result.insertedCount;
      console.log("🚀 ~ file: seed.ts:109 ~ seedUsers ~ added:", added);
    }
  };

  await seedUsers();
};
