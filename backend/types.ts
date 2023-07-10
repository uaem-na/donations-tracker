import { Document, PassportLocalDocument } from "mongoose";

// * Common types
export type Location = {
  lat: number;
  lng: number;
  postalCode: string;
};

export type ImageFile = {
  data: Buffer;
  contentType: string;
};

export type Address = {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

export type Organization = {
  name: string;
  address: Address;
  phone: string;
  type: string;
  verified: boolean;
};

// * User model related types
export type User = {
  kind: string; // ! discriminator key
  username: string;
  email: string;
  recoveryEmail: string;
  firstName: string;
  lastName: string;
  location: Location;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminUser = User;

export type OrganizationUser = User & {
  organization: Organization;
};

export type IndividualUser = User;

export type UserDocument = User &
  AdminUser &
  OrganizationUser &
  IndividualUser &
  PassportLocalDocument &
  Document & {
    lat: number;
    lng: number;
  };

// * Report model related types
export type ReportUser = Pick<
  User,
  "username" | "email" | "firstName" | "lastName"
>;

export type ReportPost = Pick<
  Post,
  "title" | "author" | "type" | "location" | "status"
>;

export type Report = {
  reporter: ReportUser;
  resolver: ReportUser;
  post: ReportPost;
  status: "resolved" | "unresolved";
  notes: string;
};

export type ReportDocument = Report & Document;

// * Post model related types
export type PostAuthor = Pick<User, "username" | "email">;

export type PostItem = {
  name: string;
  quantity: number;
  price: number;
  description: string;
  category: string;
  image: ImageFile;
};

export type Post = {
  title: string;
  type: "request" | "offer";
  items: PostItem[];
  author: PostAuthor;
  location: Location;
  status: "open" | "in-progress" | "closed";
  views: number;
};

export type PostDocument = Post & Document;
