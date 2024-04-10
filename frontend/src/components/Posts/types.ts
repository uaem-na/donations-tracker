export type FilterPostType = "all" | "request" | "offer";
export type FilterUserType = "all" | "individual" | "organization" | "reported";

export type PerPageOption = 10 | 20 | 50 | 100;
export const getPerPageOption = (num: number): PerPageOption => {
  if (num === 10 || num === 20 || num === 50 || num === 100) {
    return num as PerPageOption;
  }

  return 10;
};
