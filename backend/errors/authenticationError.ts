import { HttpError } from "./httpError";
export class AuthenticationError extends HttpError {
  constructor(message?: string) {
    super(message || "Unauthorized", 401);
    this.name = "AuthenticationError";
  }
}
