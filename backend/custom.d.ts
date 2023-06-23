declare namespace Express {
  export interface Request {
    user?: {
      id?: string;
      admin: boolean;
      email: string;
      firstName: string;
      lastName: string;
      organization: string;
      verified: boolean;
    };
  }
}
