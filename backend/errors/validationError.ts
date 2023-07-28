import { HttpError } from "./httpError";

export class ValidationError extends HttpError {
  constructor(errors: unknown[], message?: string) {
    super(message ?? "Invalid input parameters", 400, errors);
    this.name = "ValidationError";
  }
}
