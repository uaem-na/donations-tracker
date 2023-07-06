import { HttpError } from "./httpError";

export class AuthorizationError extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = "AuthorizationError";
  }
}
