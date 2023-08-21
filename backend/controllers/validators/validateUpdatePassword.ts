import { Request } from "express";
import { body } from "express-validator";

export const validateUpdatePassword = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validatePassword = body("password")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 8,
      max: 256,
    });

  let validateNewPassword = body("newPassword")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 8,
      max: 256,
    });

  let validateConfirmNewPassword = body("confirmNewPassword")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 8,
      max: 256,
    })
    .equals(req.body.newPassword);

  if (optional) {
    validatePassword = validatePassword.optional();
    validateNewPassword = validateNewPassword.optional();
    validateConfirmNewPassword = validateConfirmNewPassword.optional();
  }

  return Promise.all([
    validatePassword.run(req),
    validateNewPassword.run(req),
    validateConfirmNewPassword.run(req),
  ]);
};
