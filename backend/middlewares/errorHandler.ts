import debug from "debug";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors";

const log = debug("backend:error");

const isDev = process.env.NODE_ENV === "development";

export class ErrorHandler {
  private static logError(err: HttpError) {
    const { errors, name, message, stack, status } = err;
    log(
      `${name}[${status}]: ${message}\n${
        errors && errors.length > 0 ? `errors: [${errors}]\n` : ""
      }${stack}`
    );
  }

  private static sendError(err: HttpError, res: Response) {
    const { stack, status } = err;
    res.status(status).json({
      ...err.toJSON(),
      ...(isDev && { stack }),
    });
  }

  private static consumeFlash(err: HttpError, req: Request) {
    if (!req.flash) {
      log("req.flash is undefined");
      return;
    }

    const messages = req.flash("error");
    if (messages) {
      err.errors = messages;
    }
  }

  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    const httpError = new HttpError(err.message);
    Object.assign(httpError, err); // * wrap Error object in HttpError

    ErrorHandler.consumeFlash(httpError, req);
    ErrorHandler.logError(httpError);
    ErrorHandler.sendError(httpError, res);

    if (res.headersSent) {
      return;
    }

    res.status(500).json({
      name: "Critical Error",
      message: "Something went wrong.",
      ...(isDev && { stack: err.stack }),
    });
  }
}
