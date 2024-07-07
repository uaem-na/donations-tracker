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

export const PostStatus = {
  OPEN: "open" as const,
  PENDING_APPROVAL: "pending-approval" as const,
  REJECTED: "rejected" as const,
  IN_PROGRESS: "in-progress" as const,
  CLOSED: "closed" as const,
};
