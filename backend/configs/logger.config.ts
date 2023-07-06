import debug from "debug";
import { Express } from "express";
import logger from "morgan";

const log = debug("backend:logger");

const environment = process.env.NODE_ENV || "development";

export const configureLogger = (app: Express) => {
  if (environment === "development") {
    // * output colored by response status for development use
    app.use(logger("dev"));
    log("Morgan logger enabled with dev settings");
  } else {
    // * Apache combined format
    app.use(logger("combined"));
    log("Morgan logger enabled with combined settings (Apache combined)");
  }
};
