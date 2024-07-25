import { Request } from "express";
import { FilterUserTypeAdmin } from "../constants";
import { isEnumValue } from "./isEnumValue";

export const tryParseUserFilterQuery = (req: Request) => {
  const { user_type, with_report } = req.query;

  const parsedUserType = isEnumValue(user_type, FilterUserTypeAdmin)
    ? user_type
    : FilterUserTypeAdmin.ALL;

  const parsedWithReport =
    typeof with_report === "string"
      ? with_report.toLowerCase() === "true"
        ? true
        : false
      : false;

  return {
    ...(parsedUserType !== FilterUserTypeAdmin.ALL && {
      userType: parsedUserType,
      withReport: parsedWithReport,
    }),
  };
};
