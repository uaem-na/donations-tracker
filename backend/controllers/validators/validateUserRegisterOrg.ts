import { Request } from "express";
import { body } from "express-validator";

export const validateUserRegisterOrg = async ({
  req,
  optional,
}: {
  req: Request;
  optional: boolean;
}) => {
  let validatePhone = body("phone").trim().notEmpty().isString().isLength({
    min: 10,
    max: 20,
  });

  let validateOrgName = body("organization")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 3,
      max: 1024,
    });

  let validateStreetAdress = body("streetAddress")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 3,
      max: 256,
    });

  let validatePostalCode = body("postalCode")
    .trim()
    .notEmpty()
    .isString()
    .isPostalCode("CA");

  let validateCity = body("city").trim().notEmpty().isString().isLength({
    min: 3,
    max: 256,
  });

  let validateProvince = body("province")
    .trim()
    .notEmpty()
    .isString()
    .isLength({
      min: 1,
      max: 30,
    });

  if (optional) {
    validatePhone = validatePhone.optional();
    validateOrgName = validateOrgName.optional();
    validateStreetAdress = validateStreetAdress.optional();
    validatePostalCode = validatePostalCode.optional();
    validateCity = validateCity.optional();
    validateProvince = validateProvince.optional();
  }

  return await Promise.all([
    validatePhone.run(req),
    validateOrgName.run(req),
    validateStreetAdress.run(req),
    validatePostalCode.run(req),
    validateCity.run(req),
    validateProvince.run(req),
  ]);
};
