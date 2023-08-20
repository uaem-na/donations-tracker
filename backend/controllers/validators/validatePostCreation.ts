import { Request } from "express";
import { body } from "express-validator";
import { PostCategories, PostTypes } from "../../constants";

export const validatePostCreation = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validateType = body("type").trim().notEmpty().isIn(PostTypes);
  let validateItem = body("item").isObject();
  let validateItemName = body("item.name")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      max: 256,
    });
  let validateItemQuantity = body("item.quantity").trim().notEmpty().isInt({
    min: 1,
    allow_leading_zeroes: false,
  });
  let validateItemPrice = body("item.price").trim().notEmpty().isInt({
    min: 0,
    allow_leading_zeroes: false,
  });
  let validateItemDescription = body("item.description")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      max: 2048,
    });
  let validateItemCategory = body("item.category")
    .trim()
    .notEmpty()
    .isString()
    .isIn(PostCategories);

  // TODO: image not supported for now
  const validateImage = body("item.image").optional().isObject();
  const validateImageData = body("item.image.data")
    .optional()
    .notEmpty()
    .isBase64();
  const validateImageContentType = body("item.image.contentType")
    .optional()
    .trim()
    .notEmpty()
    .isString();

  if (optional) {
    validateType = validateType.optional();
    validateItem = validateItem.optional();
    validateItemName = validateItemName.optional();
    validateItemQuantity = validateItemQuantity.optional();
    validateItemPrice = validateItemPrice.optional();
    validateItemDescription = validateItemDescription.optional();
    validateItemCategory = validateItemCategory.optional();
  }

  await validateType.run(req);
  await validateItem.run(req);
  await validateItemName.run(req);
  await validateItemQuantity.run(req);
  await validateItemPrice.run(req);
  await validateItemDescription.run(req);
  await validateItemCategory.run(req);
  await validateImage.run(req);
  await validateImageData.run(req);
  await validateImageContentType.run(req);
};
