import { Request } from "express";
import { check } from "express-validator";

export const validatePostId = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validatePostId = check("postId").trim().notEmpty().isString().isMongoId();

  if (optional) {
    validatePostId = validatePostId.optional();
  }

  await validatePostId.run(req);
};
