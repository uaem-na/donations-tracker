import { Request } from "express";
import { FilterUserTypeAdmin } from "../constants";
import { isEnumValue } from "./isEnumValue";

export const tryParseUserFilterQuery = (req: Request) => {
  const { user_type, reported_user } = req.query;

  const parsedUserType = isEnumValue(user_type, FilterUserTypeAdmin)
    ? user_type
    : FilterUserTypeAdmin.ALL;

  const parsedReportedUser =
    typeof reported_user === "string"
      ? reported_user.toLowerCase() === "true"
        ? true
        : false
      : false;

  return {
    ...(parsedUserType !== FilterUserTypeAdmin.ALL && {
      userType: parsedUserType,
      reported_user: parsedReportedUser,
    }),
  };
};
