// seed the database with some data if it's empty
import { connect, connection } from "mongoose";
import { seedPosts } from "./seed.posts";
import { seedReports } from "./seed.reports";
import { seedUsers } from "./seed.users";

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

  const users = await seedUsers(destroy, 5);
  const posts = await seedPosts(destroy, 5, users);
  const reports = await seedReports(destroy, users[0], posts);
};
