import debug from "debug";
import { Express } from "express";
import { connect, connection } from "mongoose";

const log = debug("backend:db");

const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
  // ! we exit the process if there is no connection string to MongoDB
  log("Missing CONNECTION_STRING environment variable");
  process.exit(1);
}

export const configureDb = (app: Express) => {
  connect(connectionString);

  // TODO: should we exit the process if there is an error?
  connection.on("error", console.error.bind(console, "CONNECTION ERROR"));

  connection.once("open", () => {
    log(
      `Connected to MongoDB at ${connection.host}:${connection.port}/${connection.db.databaseName}`
    );
  });
};
