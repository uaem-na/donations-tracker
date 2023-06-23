require("dotenv").config();

import crypto from "crypto";

const debug = require("debug")("backend:app");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");

const authRouter = require("./routes/auth");
const offersRouter = require("./routes/offers");
const reportsRouter = require("./routes/reports");
const requestsRouter = require("./routes/requests");
const usersRouter = require("./routes/users");

const environment = process.env.NODE_ENV || "development";

const app = express();

// * log requests to console
if (environment === "development") {
  // * output colored by response status for development use
  app.use(logger("dev"));
} else {
  // * Apache combined format
  app.use(logger("combined"));
}

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// * remove headers that reveal server info
app.disable("x-powered-by");
app.disable("etag");
app.disable("server");

// * app hosted in Google Cloud Run, which prob uses lb
app.set("trust proxy", 1);

const session = require("express-session");
const sessionName = process.env.SESSION_NAME || "__session";
debug(`session name: ${sessionName}`);

const cookieDomain = process.env.COOKIE_DOMAIN || "localhost";
debug(`cookie domain: ${cookieDomain}`);

const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(20).toString("hex");

// ! we exit the process if there is no connection string to MongoDB
const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
  // * do not hide error message using debug since this is a fatal error
  console.error("Missing CONNECTION_STRING environment variable");

  process.exit(1);
} else {
  mongoose.connect(connectionString);

  const connection = mongoose.connection;

  // TODO: should we exit the process if there is an error?
  connection.on("error", console.error.bind(console, "CONNECTION ERROR"));

  connection.once("open", () => {
    debug(
      `Connected to MongoDB at ${connection.host}:${connection.port}/${connection.db.databaseName}`
    );
  });

  const MongoDBStore = require("connect-mongodb-session")(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.CONNECTION_STRING,
    collection: "sessions",
  });

  // set up sesion with MongoDB
  app.use(
    session({
      name: sessionName,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // ! set cookie domain via environment variable, default to localhost
        domain: process.env.COOKIE_DOMAIN || "localhost",
        // ! set secure to true for production
        secure: environment === "production",
        maxAge: 60 * 60 * 1000,
        // ! set sameSite to 'none' for cross-site requests, 'lax' for development
        sameSite: environment === "production" ? "none" : "lax",
      },
      store: sessionStore,
    })
  );
}

// set up flash middleware
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

app.use("/auth", authRouter);
app.use("/offers", offersRouter);
app.use("/reports", reportsRouter);
app.use("/requests", requestsRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error("Not Found");
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

// * set up port
const port = process.env.PORT || 3000;
app.set("port", port);

// * start server
app.listen(port, () => {
  debug(`Server is running at http://localhost:${port}`);
});

app.on("error", onError);
app.on("listening", onListening);

// test

// * error handler for app start
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// * event listener for app start
function onListening() {
  var addr = app.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

module.exports = app;
