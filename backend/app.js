require("dotenv").config();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
};

const debug = require("debug")("backend:app");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
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
