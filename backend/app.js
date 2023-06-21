require("dotenv").config();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
  credentials: true,
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
const flash = require("connect-flash");

const authRouter = require("./routes/auth");
const offersRouter = require("./routes/offers");
const reportsRouter = require("./routes/reports");
const requestsRouter = require("./routes/requests");
const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", 1);

// set up session and passport local strategy in MongoDB
const session = require("express-session");
if (!process.env.CONNECTION_STRING) {
  app.use(
    session({
      name: "__session",
      secret:
        process.env.SESSION_SECRET || crypto.randomBytes(20).toString("hex"),
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(flash());
} else {
  const MongoDBStore = require("connect-mongodb-session")(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.CONNECTION_STRING,
    collection: "sessions",
  });

  // set up sesion with MongoDB
  app.use(
    session({
      name: "__session",
      secret:
        process.env.SESSION_SECRET || crypto.randomBytes(20).toString("hex"),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
        // ! we need to set sameSite to none for cross-site requests
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      },
      store: sessionStore,
    })
  );

  app.use(flash());

  // set up passport middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  // set up passport local strategy
  const { User } = require("./models/user");
  passport.use(User.createStrategy());

  // set up passport local serialization
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

app.use("/auth", authRouter);
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    if (req.flash) {
      const flashError = req.flash("error");
      if (flashError && flashError.length > 0) {
        err.message = flashError[0];
      }
    }
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
