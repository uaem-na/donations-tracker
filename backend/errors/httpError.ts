export class HttpError extends Error {
  private _status: number | undefined;
  private _errors?: unknown[];

  constructor(message: string, status?: number, errors?: unknown[]) {
    super(message);
    this.name = "HttpError"; // this can be overridden by Object.assign
    this._status = status;
    this._errors = errors;
  }

  get status(): number {
    return this._status || 500;
  }

  set status(value: number) {
    this._status = value || 500;
  }

  get errors(): unknown[] {
    return this._errors || [];
  }

  set errors(value: unknown[]) {
    this._errors = value || [];
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
