import { HttpError } from "./httpError";

export class InvalidOperationError extends HttpError {
  constructor(message: string) {
    super(message, 500);
    this.name = "InvalidOperationError";
  }
}
