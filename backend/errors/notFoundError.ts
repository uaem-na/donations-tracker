import { HttpError } from "./httpError";

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
