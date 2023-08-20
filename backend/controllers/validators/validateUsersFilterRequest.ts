import { Request } from "express";
import { query } from "express-validator";
import { FilterableUserTypesAdmin } from "../../constants";

export const validateUsersFilterRequest = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validateUserType = query("user_type")
    .trim()
    .notEmpty()
    .isIn(FilterableUserTypesAdmin);

  if (optional) {
    validateUserType = validateUserType.optional();
  }

  await validateUserType.run(req);
};
