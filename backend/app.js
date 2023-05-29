require("dotenv").config();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
};

const debug = require("debug")("backend:app");
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const crypto = require("crypto");

const indexRouter = require("./routes/index");
const offersRouter = require("./routes/offers");
const reportsRouter = require("./routes/reports");
const requestsRouter = require("./routes/requests");
const usersRouter = require("./routes/users");

const app = express();

// set up session and passport local strategy in MongoDB
if (!process.env.CONNECTION_STRING) {
  debug(
    "Missing CONNECTION_STRING environment variable, session will not be configured"
  );
} else {
  const session = require("express-session");
  const MongoDBStore = require("connect-mongodb-session")(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.CONNECTION_STRING,
    collection: "sessions",
  });

  // set up sesion with MongoDB
  app.use(
    session({
      secret:
        process.env.SESSION_SECRET || crypto.randomBytes(20).toString("hex"),
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
      },
      store: sessionStore,
    })
  );

  // set up passport middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  // set up passport local strategy
  const User = require("./models/user");
  passport.use(User.createStrategy());

  // set up passport local serialization
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/offers", offersRouter);
app.use("/reports", reportsRouter);
app.use("/requests", requestsRouter);
app.use("/users", usersRouter);

const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
  debug("Missing CONNECTION_STRING environment variable");
} else {
  mongoose.connect(connectionString);

  const connection = mongoose.connection;
  connection.on("error", console.error.bind(console, "CONNECTION ERROR"));
  connection.once("open", () => {
    debug(
      `Connected to MongoDB at ${connection.host}:${connection.port}/${connection.db.databaseName}`
    );
  });
}

module.exports = app;
