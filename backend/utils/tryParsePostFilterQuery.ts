import { Request } from "express";

import { FilterPostType, FilterUserType } from "../constants";
import { isEnumValue } from "./isEnumValue";

export const tryParsePostFilterQuery = (req: Request) => {
  const { post_type, user_type, price_range, categories, date } = req.query;

  const parsedPostType = isEnumValue(post_type, FilterPostType)
    ? post_type
    : FilterPostType.ALL;

  const parsedUserType = isEnumValue(user_type, FilterUserType)
    ? user_type
    : FilterUserType.ALL;

  const parsedPriceRange =
    Array.isArray(price_range) &&
    price_range.length == 2 &&
    Number.isFinite(price_range[0]) &&
    Number.isFinite(price_range[1])
      ? price_range
      : [0, 100];

  const parsedCategories =
    Array.isArray(categories) && categories.length > 0
      ? (categories as string[])
      : [];

  // remove "all" from parsedCategories if they exist
  if (parsedCategories.includes("all")) {
    parsedCategories.splice(parsedCategories.indexOf("all"), 1);
  }

  const parsedDateValue = date ? new Date(date as string) : null;

  return {
    ...(parsedPostType !== FilterPostType.ALL && { postType: parsedPostType }),
    ...(parsedUserType !== FilterUserType.ALL && { userType: parsedUserType }),
    ...{ priceRange: parsedPriceRange },
    ...(parsedCategories.length > 0 && { categories: parsedCategories }),
    ...(parsedDateValue && { date: parsedDateValue }),
  };
};
