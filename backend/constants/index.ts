export enum PostDiscriminator {
  OFFER = "OfferPost",
  REQUEST = "RequestPost",
}

export enum PostType {
  OFFER = "offer",
  REQUEST = "request",
}

export enum PostStatus {
  OPEN = "open",
  IN_PROGRESS = "in-progress",
  CLOSED = "closed",
}

export enum UserRole {
  ADMIN = "admin",
  ORGANIZATION = "organization",
  INDIVIDUAL = "individual",
}

export enum UserDiscriminator {
  ADMIN = "AdminUser",
  ORGANIZATION = "OrganizationUser",
  INDIVIDUAL = "IndividualUser",
}

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

export enum CountryCode {
  CANADA = "CA",
}

export enum CountryName {
  CANADA = "Canada",
}

export enum ModelName {
  POST = "Post",
  USER = "User",
  REPORT = "Report",
}

export enum ReportStatus {
  RESOLVED = "resolved",
  UNRESOLVED = "unresolved",
}

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
