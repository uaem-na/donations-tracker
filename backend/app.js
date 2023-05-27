require("dotenv").config();

const port = parseInt(process.env.PORT) || 8081;
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
};

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

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});
const atlasConnectionString = process.env.ATLAS_CONNECTION;
if (!atlasConnectionString) {
  console.warn("Missing ATLAS_CONNECTION environment variable");
} else {
  mongoose.connect(atlasConnectionString);

  const connection = mongoose.connection;
  connection.on("error", console.error.bind(console, "CONNECTION ERROR"));
  connection.once("open", () => {
    console.log(
      `Connected to MongoDB Atlas at ${connection.host}:${connection.port}`
    );
  });
}

module.exports = app;
