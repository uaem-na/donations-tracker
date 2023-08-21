import { Request } from "express";
import { body } from "express-validator";

export const validateUpdateUserInfo = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validateDisplayName = body("displayName")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 3,
      max: 32,
    });

  let validateFirstName = body("firstName")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 1,
      max: 32,
    });

  let validateLastName = body("lastName")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 1,
      max: 32,
    });

  if (optional) {
    validateDisplayName = validateDisplayName.optional();
    validateFirstName = validateFirstName.optional();
    validateLastName = validateLastName.optional();
  }

  return Promise.all([
    validateDisplayName.run(req),
    validateFirstName.run(req),
    validateLastName.run(req),
  ]);
};
