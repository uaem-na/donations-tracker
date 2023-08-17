import { Request } from "express";
import { query } from "express-validator";

export const validatePaginationRequest = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validatePage = query("page").trim().isInt({
    min: 1,
    allow_leading_zeroes: false,
  });

  let validatePerPage = query("per_page").trim().isInt({
    min: 1,
    max: 100,
    allow_leading_zeroes: false,
  });

  if (optional) {
    validatePage = validatePage.optional();
    validatePerPage = validatePerPage.optional();
  }

  await validatePage.run(req);
  await validatePerPage.run(req);
};
