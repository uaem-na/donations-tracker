import ConnectMongoDBSession from "connect-mongodb-session";
import { randomBytes } from "crypto";
import debug from "debug";
import { Express } from "express";
import session from "express-session";

const log = debug("backend:session");

const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
  // ! we exit the process if there is no connection string to MongoDB
  log("Missing CONNECTION_STRING environment variable");
  process.exit(1);
}

const sessionName = process.env.SESSION_NAME || "__session";
const cookieDomain = process.env.COOKIE_DOMAIN || "localhost";
const collectionName = process.env.SESSION_COLLECTION || "sessions";
log(`session name: ${sessionName}`);
log(`cookie domain: ${cookieDomain}`);
log(`collection name: ${collectionName}`);

// ! read the documentation regarding secret rotation
const sessionSecret =
  process.env.SESSION_SECRET || randomBytes(20).toString("hex");

export const configureSession = (
  app: Express,
  enableCors: boolean,
  shouldSecureCookie: boolean
) => {
  const MongoStore = ConnectMongoDBSession(session);
  const sessionStore = new MongoStore({
    uri: connectionString,
    collection: collectionName,
  });

  // * set up Express to use session backed by MongoDB
  app.use(
    session({
      name: sessionName,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      rolling: true, // ! reset maxAge on every request
      cookie: {
        domain: cookieDomain,
        secure: shouldSecureCookie,
        maxAge: 60 * 60 * 1000,
        sameSite: enableCors && shouldSecureCookie ? "none" : "lax",
      },
      store: sessionStore,
    })
  );
};
