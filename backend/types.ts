import { Document, PassportLocalDocument } from "mongoose";

// * Common types
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  per_page: number;
};

export type OptionallyPaginatedListResponse<T> = Omit<
  PaginatedResponse<T>,
  "page" | "per_page" | "total"
> & {
  total?: number;
  page?: number;
  per_page?: number;
};

export type Location = {
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

export type ImageFileDocument = ImageFile & Document;

export type Address = {
  street: string;
  city: string;
  province: string;
  provinceCode: string;
  postalCode: string;
  country: string;
  countryCode: string;
};

export type AddressDocument = Address & Document;

export type Organization = {
  name: string;
  address: Address;
  phone: string;
  type: string;
  verified: boolean;
};

export type OrganizationDocument = Organization & Document;

// * User model related types
export type User = {
  displayName: string;
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
  post: Post | PostDocument;
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

export type PostItemDocument = PostItem & Document;

export type Post = {
  author: User;
  authorType: "individual" | "organization";
  location: Location | LocationDocument;
  item: PostItem | PostItemDocument;
  status: "open" | "in-progress" | "closed" | "pending-approval";
  views: number;
  createdAt: Date;
  updatedAt: Date;
  type: "request" | "offer";
};

export type PostDocument = Post & Document;
