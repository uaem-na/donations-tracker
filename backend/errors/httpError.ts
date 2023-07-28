export class HttpError extends Error {
  status: number;
  errors?: unknown[];

  constructor(message: string, status?: number, errors?: unknown[]) {
    super(message);
    this.name = "HttpError"; // this can be overridden by Object.assign
    this.status = status ?? 500;
    this.errors = errors ?? [];
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      ...(this.errors && { errors: this.errors }),
    };
  }
}
