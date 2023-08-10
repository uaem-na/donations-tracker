import { Document, PassportLocalDocument } from "mongoose";

// * Common types
export type OptionallyPaginatedListResponse<T> = {
  data: T[];
  total: number;
  page?: number;
  per_page?: number;
};

export type Location = {
  _id: string;
  lat: number;
  lng: number;
  postalCode: string;
};

export type LocationDocument = Location & Document;

export type ImageFile = {
  _id: string;
  data: Buffer;
  contentType: string;
};

export type Address = {
  _id: string;
  street: string;
  city: string;
  province: string;
  provinceCode: string;
  postalCode: string;
  country: string;
  countryCode: string;
};

export type Organization = {
  _id: string;
  name: string;
  address: Address;
  phone: string;
  type: string;
  verified: boolean;
};

// * User model related types
export type User = {
  _id: string;
  kind: string; // ! discriminator key
  username: string;
  email: string;
  recoveryEmail: string;
  firstName: string;
  lastName: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  location: Location | LocationDocument;
  starred: Post[] | PostDocument[];
  isAdmin: () => boolean;
  isOrganization: () => boolean;
  isIndividual: () => boolean;
};

export type OrganizationUser = User & {
  organization: Organization;
};

export type UserDocument = User &
  OrganizationUser &
  PassportLocalDocument &
  Document & {
    lat: number;
    lng: number;
  };

// * Report model related types
export type Report = {
  _id: string;
  reporter: User;
  resolver: User;
  post: Post;
  status: "resolved" | "unresolved";
  notes: string;
};

export type ReportDocument = Report & Document;

// * Post model related types
export type PostItem = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
  category: string;
  image: ImageFile;
};

export type Post = {
  _id: string;
  author: User;
  location: Location;
  item: PostItem;
  status: "open" | "in-progress" | "closed";
  views: number;
  createdAt: Date;
  updatedAt: Date;
  type: "request" | "offer";
};

export type PostDocument = Post & Document;
