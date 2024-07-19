import { Request } from "express";
import { body } from "express-validator";

export const validateUserDeactivationReason = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validateUserDeactivationReason = body("reason")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 512 });

  if (optional) {
    validateUserDeactivationReason = validateUserDeactivationReason.optional();
  }

  await validateUserDeactivationReason.run(req);
};
