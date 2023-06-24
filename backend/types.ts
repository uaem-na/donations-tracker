import { Document, PassportLocalDocument, Types } from "mongoose";

// * User model related types
export type IUser = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  admin: boolean;
  active: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserDocument = IUser & PassportLocalDocument & Document;

// * Report model related types
export type IReport = {
  postId: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  status: "resolved" | "unresolved";
  notes: string;
  reportedBy: Types.ObjectId | string;
  resolvedBy: Types.ObjectId | string;
};

export type IReportDocument = IReport & Document;

// * Post model related types
export type IPostImage = {
  data: Buffer;
  contentType: string;
};

export type IPostLocation = {
  lat?: number;
  lng?: number;
  postalCode?: string;
};

export type IPost = {
  author: Types.ObjectId | string;
  type: "request" | "offer";
  status: "open" | "in-progress" | "closed";
  title: string;
  description: string;
  location: IPostLocation;
  tags: string[];
  images: IPostImage[];
  views: number;
};

export type IPostDocument = IPost & Document;
