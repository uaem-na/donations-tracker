import debug from "debug";
import dotenv from "dotenv";
import express from "express";
import {
  configureDb,
  configureLogger,
  configurePassportjs,
  configureRoutes,
  configureSession,
} from "./configs";
import { configureServer } from "./configs/server.config";
import { HttpError } from "./errors";
import { ErrorHandler } from "./middlewares";

dotenv.config();

const log = debug("backend:entry");
const environment = process.env.NODE_ENV || "development";
log(`NODE_ENV: ${environment}`);

const app = express();
configureLogger(app);
configureServer(app, true);
configureDb(app);
configureSession(app, true, environment === "production"); // ! DB must be configured before continuing
configurePassportjs(app);
configureRoutes(app);

// * end of all routes & forward to error handler
app.use((req, res, next) => {
  const error = new HttpError("Not Found", 404);
  next(error);
});

// * centralized error handler
app.use(ErrorHandler.handle);

// * set up port
const port = process.env.PORT || 3000;
app.set("port", port);

// * start server
app.listen(port, () => {
  log(`Server is running at http://localhost:${port}`);
});

app.on("error", onError);
app.on("listening", onListening);

// * error handler for app start
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

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
  // ! address property is added by Node.js http.Server class, cast app as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addr = (app as any).address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  log("Listening on " + bind);
}

module.exports = app;
