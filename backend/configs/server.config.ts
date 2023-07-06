import flash from "connect-flash";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import debug from "debug";
import express, { Express } from "express";

const log = debug("backend:server");

const environment = process.env.NODE_ENV || "development";
const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
  credentials: true,
};

export const configureServer = (app: Express, enableCors: boolean) => {
  if (enableCors) {
    log("CORS enabled");
    app.use(cors(corsOptions));
  }

  app.use(express.json());

  // * this replaces body-parser
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // * remove headers that reveal server info
  app.disable("x-powered-by");
  app.disable("etag");
  app.disable("server");

  // * app hosted in Google Cloud Run, which prob uses lb
  if (environment === "production") {
    log(`trust proxy enabled`);
    app.set("trust proxy", 1);
  }

  // * set up flash middleware
  app.use(flash());
};
