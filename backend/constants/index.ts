export enum PostDiscriminator {
  OFFER = "OfferPost",
  REQUEST = "RequestPost",
}

export const PostDiscriminators = [
  PostDiscriminator.OFFER,
  PostDiscriminator.REQUEST,
];

export enum PostType {
  OFFER = "offer",
  REQUEST = "request",
}

export const PostTypes = [PostType.OFFER, PostType.REQUEST];

export enum FilterPostType {
  ALL = "all",
  OFFER = "offer",
  REQUEST = "request",
}

export const FilterablePostTypes = [
  FilterPostType.ALL,
  FilterPostType.OFFER,
  FilterPostType.REQUEST,
];

export enum FilterUserType {
  ALL = "all",
  ORGANIZATION = "organization",
  INDIVIDUAL = "individual",
}

export const FilterableUserTypes = [
  FilterUserType.ALL,
  FilterUserType.ORGANIZATION,
  FilterUserType.INDIVIDUAL,
];

export enum FilterUserTypeAdmin {
  ALL = "all",
  ADMIN = "admin",
  ORGANIZATION = "organization",
  INDIVIDUAL = "individual",
}

export const FilterableUserTypesAdmin = [
  FilterUserTypeAdmin.ALL,
  FilterUserTypeAdmin.ADMIN,
  FilterUserTypeAdmin.ORGANIZATION,
  FilterUserTypeAdmin.INDIVIDUAL,
];

export enum PostStatus {
  OPEN = "open",
  PENDING_APPROVAL = "pending-approval",
  IN_PROGRESS = "in-progress", // TODO: is this needed?
  CLOSED = "closed",
}

export const PostStatuses = [
  PostStatus.OPEN,
  PostStatus.PENDING_APPROVAL,
  PostStatus.IN_PROGRESS,
  PostStatus.CLOSED,
];

export enum UserRole {
  ADMIN = "admin",
  ORGANIZATION = "organization",
  INDIVIDUAL = "individual",
}

export const UserRoles = [
  UserRole.ADMIN,
  UserRole.ORGANIZATION,
  UserRole.INDIVIDUAL,
];

export enum UserDiscriminator {
  ADMIN = "AdminUser",
  ORGANIZATION = "OrganizationUser",
  INDIVIDUAL = "IndividualUser",
}

export const UserDiscriminators = [
  UserDiscriminator.ADMIN,
  UserDiscriminator.ORGANIZATION,
  UserDiscriminator.INDIVIDUAL,
];

export enum ProvinceCode {
  ALBERTA = "AB",
  BRITISH_COLUMBIA = "BC",
  MANITOBA = "MB",
  NEW_BRUNSWICK = "NB",
  NEWFOUNDLAND_AND_LABRADOR = "NL",
  NORTHWEST_TERRITORIES = "NT",
  NOVA_SCOTIA = "NS",
  NUNAVUT = "NU",
  ONTARIO = "ON",
  PRINCE_EDWARD_ISLAND = "PE",
  QUEBEC = "QC",
  SASKATCHEWAN = "SK",
  YUKON = "YT",
}

export const ProvinceCodes = [
  ProvinceCode.ALBERTA,
  ProvinceCode.BRITISH_COLUMBIA,
  ProvinceCode.MANITOBA,
  ProvinceCode.NEW_BRUNSWICK,
  ProvinceCode.NEWFOUNDLAND_AND_LABRADOR,
  ProvinceCode.NORTHWEST_TERRITORIES,
  ProvinceCode.NOVA_SCOTIA,
  ProvinceCode.NUNAVUT,
  ProvinceCode.ONTARIO,
  ProvinceCode.PRINCE_EDWARD_ISLAND,
  ProvinceCode.QUEBEC,
  ProvinceCode.SASKATCHEWAN,
  ProvinceCode.YUKON,
];

export enum ProvinceName {
  ALBERTA = "Alberta",
  BRITISH_COLUMBIA = "British Columbia",
  MANITOBA = "Manitoba",
  NEW_BRUNSWICK = "New Brunswick",
  NEWFOUNDLAND_AND_LABRADOR = "Newfoundland and Labrador",
  NORTHWEST_TERRITORIES = "Northwest Territories",
  NOVA_SCOTIA = "Nova Scotia",
  NUNAVUT = "Nunavut",
  ONTARIO = "Ontario",
  PRINCE_EDWARD_ISLAND = "Prince Edward Island",
  QUEBEC = "Quebec",
  SASKATCHEWAN = "Saskatchewan",
  YUKON = "Yukon",
}

export const ProvinceNames = [
  ProvinceName.ALBERTA,
  ProvinceName.BRITISH_COLUMBIA,
  ProvinceName.MANITOBA,
  ProvinceName.NEW_BRUNSWICK,
  ProvinceName.NEWFOUNDLAND_AND_LABRADOR,
  ProvinceName.NORTHWEST_TERRITORIES,
  ProvinceName.NOVA_SCOTIA,
  ProvinceName.NUNAVUT,
  ProvinceName.ONTARIO,
  ProvinceName.PRINCE_EDWARD_ISLAND,
  ProvinceName.QUEBEC,
  ProvinceName.SASKATCHEWAN,
  ProvinceName.YUKON,
];

export enum CountryCode {
  CANADA = "CA",
}

export const CountryCodes = [CountryCode.CANADA];

export enum CountryName {
  CANADA = "Canada",
}

export const CountryNames = [CountryName.CANADA];

export enum ModelName {
  POST = "Post",
  USER = "User",
  REPORT = "Report",
}

export const ModelNames = [ModelName.POST, ModelName.USER, ModelName.REPORT];

export enum ReportStatus {
  RESOLVED = "resolved",
  UNRESOLVED = "unresolved",
}

export const ReportStatuses = [ReportStatus.RESOLVED, ReportStatus.UNRESOLVED];

export enum PostCategory {
  BOOK = "book",
  CLOTHING = "clothing",
  CUTLERY = "cutlery",
  ELECTRONICS = "electronics",
  FOOD = "food",
  FURNITURE = "furniture",
  PPE = "ppe",
  STATIONARY = "stationary",
  TOY = "toy",
  OTHER = "other",
}

export const PostCategories = [
  PostCategory.BOOK,
  PostCategory.CLOTHING,
  PostCategory.CUTLERY,
  PostCategory.ELECTRONICS,
  PostCategory.FOOD,
  PostCategory.FURNITURE,
  PostCategory.PPE,
  PostCategory.STATIONARY,
  PostCategory.TOY,
  PostCategory.OTHER,
];

export const BilingualPostCategory = {
  [PostCategory.BOOK]: {
    en: "Book",
    fr: "Livre",
  },
  [PostCategory.CLOTHING]: {
    en: "Clothing",
    fr: "Vêtements",
  },
  [PostCategory.CUTLERY]: {
    en: "Cutlery",
    fr: "Couverts",
  },
  [PostCategory.ELECTRONICS]: {
    en: "Electronics",
    fr: "Électronique",
  },
  [PostCategory.FOOD]: {
    en: "Food",
    fr: "Nourriture",
  },
  [PostCategory.FURNITURE]: {
    en: "Furniture",
    fr: "Meubles",
  },
  [PostCategory.PPE]: {
    en: "PPE",
    fr: "ÉPI",
  },
  [PostCategory.STATIONARY]: {
    en: "Stationary",
    fr: "Papeterie",
  },
  [PostCategory.TOY]: {
    en: "Toy",
    fr: "Jouet",
  },
  [PostCategory.OTHER]: {
    en: "Other",
    fr: "Autre",
  },
};
