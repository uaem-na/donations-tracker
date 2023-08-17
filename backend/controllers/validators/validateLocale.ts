import { Request } from "express";
import { check } from "express-validator";

export const validateLocale = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validateLocale = check("locale")
    .trim()
    .notEmpty()
    .isString()
    .isIn(["en", "fr"]);

  if (optional) {
    validateLocale = validateLocale.optional();
  }

  await validateLocale.run(req);
};
