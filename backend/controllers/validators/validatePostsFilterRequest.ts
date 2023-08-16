import { Request } from "express";
import { query } from "express-validator";
import { FilterablePostTypes, FilterableUserTypes } from "../../constants";

export const validatePostsFilterRequest = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validatePostType = query("post_type")
    .trim()
    .notEmpty()
    .isIn(FilterablePostTypes);

  let validateUserType = query("user_type")
    .trim()
    .notEmpty()
    .isIn(FilterableUserTypes);

  let validateCategories = query("categories").isArray({
    min: 0,
    max: 10,
  });

  let validateCategoryValues = query("categories.*")
    .trim()
    .notEmpty()
    .isLength({
      min: 1,
      max: 50,
    });
  // TODO: chain custom validator to check if category exists

  if (optional) {
    validatePostType = validatePostType.optional();
    validateUserType = validateUserType.optional();
    validateCategories = validateCategories.optional();
    validateCategoryValues = validateCategoryValues.optional();
  }

  await validatePostType.run(req);
  await validateUserType.run(req);
  await validateCategories.run(req);
  await validateCategoryValues.run(req);
};
