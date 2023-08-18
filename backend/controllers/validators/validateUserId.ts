import { Request } from "express";
import { check } from "express-validator";

export const validateUserId = async ({
  key,
  req,
  optional,
}: {
  key: "userId" | "id";
  req: Request;
  optional: boolean;
}) => {
  let validateUserId = check(key).trim().notEmpty().isString().isMongoId();

  if (optional) {
    validateUserId = validateUserId.optional();
  }

  await validateUserId.run(req);
};
