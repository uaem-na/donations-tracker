export const UserRole = {
  ADMIN: "admin" as const,
  ORGANIZATION: "organization" as const,
  INDIVIDUAL: "individual" as const,
};

export const PostType = {
  OFFER: "offer" as const,
  REQUEST: "request" as const,
};

export const UserDiscriminator = {
  ORGANIZATION: "OrganizationUser" as const,
  INDIVIDUAL: "IndividualUser" as const,
};
