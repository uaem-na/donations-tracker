/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { UserDto } from "./models";

declare global {
  namespace Express {
    interface User extends UserDto {
      id: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}
