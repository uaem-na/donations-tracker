import { Request } from "express";
import { FilterPostType, FilterUserType } from "../constants";
import { isEnumValue } from "./isEnumValue";

export const tryParsePostFilterQuery = (req: Request) => {
  const { post_type, user_type, categories } = req.query;

  const parsedPostType = isEnumValue(post_type, FilterPostType)
    ? post_type
    : FilterPostType.ALL;

  const parsedUserType = isEnumValue(user_type, FilterUserType)
    ? user_type
    : FilterUserType.ALL;

  const parsedCategories =
    Array.isArray(categories) && categories.length > 0
      ? (categories as string[])
      : [];

  // remove "all" from parsedCategories if they exist
  if (parsedCategories.includes("all")) {
    parsedCategories.splice(parsedCategories.indexOf("all"), 1);
  }

  return {
    ...(parsedPostType !== FilterPostType.ALL && { postType: parsedPostType }),
    ...(parsedUserType !== FilterUserType.ALL && { userType: parsedUserType }),
    ...(parsedCategories.length > 0 && { categories: parsedCategories }),
  };
};
