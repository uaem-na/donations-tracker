import { Request } from "express";
import { FilterUserTypeAdmin } from "../constants";
import { isEnumValue } from "./isEnumValue";

export const tryParseUserFilterQuery = (req: Request) => {
  const { user_type } = req.query;

  const parsedUserType = isEnumValue(user_type, FilterUserTypeAdmin)
    ? user_type
    : FilterUserTypeAdmin.ALL;

  return {
    ...(parsedUserType !== FilterUserTypeAdmin.ALL && {
      userType: parsedUserType,
    }),
  };
};
