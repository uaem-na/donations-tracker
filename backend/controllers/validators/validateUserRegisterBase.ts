import { Request } from "express";
import { body } from "express-validator";
import { UserDiscriminator } from "../../constants";

export const validateUserRegisterBase = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validateType = body("type")
    .trim()
    .notEmpty()
    .isIn([UserDiscriminator.INDIVIDUAL, UserDiscriminator.ORGANIZATION]);

  let validateUsername = body("username")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 3,
      max: 32,
    });
  let validateEmail = body("email").trim().notEmpty().isEmail();

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

  let validatePassword = body("password")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 8,
      max: 256,
    });

  if (optional) {
    validateType = validateType.optional();
    validateUsername = validateUsername.optional();
    validateEmail = validateEmail.optional();
    validateFirstName = validateFirstName.optional();
    validateLastName = validateLastName.optional();
    validatePassword = validatePassword.optional();
  }

  return await Promise.all([
    validateType.run(req),
    validateUsername.run(req),
    validateEmail.run(req),
    validateFirstName.run(req),
    validateLastName.run(req),
    validatePassword.run(req),
  ]);
};
