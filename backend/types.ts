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
  provinceCode: string;
  postalCode: string;
  country: string;
  countryCode: string;
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
  role: string;
  isAdmin: () => boolean;
  isOrganization: () => boolean;
  isIndividual: () => boolean;
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
export type Report = {
  reporter: User;
  resolver: User;
  post: Post;
  status: "resolved" | "unresolved";
  notes: string;
};

export type ReportDocument = Report & Document;

// * Post model related types
export type PostItem = {
  name: string;
  quantity: number;
  price: number;
  description: string;
  category: string;
  image: ImageFile;
};

export type Post = {
  author: User;
  location: Location;
  title: string;
  items: PostItem[];
  status: "open" | "in-progress" | "closed";
  views: number;
  createdAt: Date;
  updatedAt: Date;
  type: "request" | "offer";
};

export type OfferPost = Post;

export type RequestPost = Post;

export type PostDocument = Post & Document;
