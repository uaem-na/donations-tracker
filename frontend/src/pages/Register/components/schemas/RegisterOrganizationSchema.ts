import * as yup from "yup";

import YupPassword from "yup-password";
YupPassword(yup); // ! extend yup for password validation

export const registerOrganizationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be less than 32 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .max(256, "Must be less than 256 characters")
    .minLowercase(1, "Must contain at least 1 lowercase letter")
    .minUppercase(1, "Must contain at least 1 uppercase letter")
    .minNumbers(1, "Must contain at least 1 number")
    .minSymbols(1, "Must contain at least 1 symbol")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  firstName: yup
    .string()
    .min(1, "Must be 1 character or more")
    .max(32, "Must be less than 32 characters")
    .matches(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/,
      "Must contain only letters and symbols (-')",
    )
    .required("First name is required"),
  lastName: yup
    .string()
    .min(1, "Must be 1 character or more")
    .max(32, "Must be less than 32 characters")
    .matches(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/,
      "Must contain only letters and symbols (-')",
    )
    .required("Last name is required"),
  phone: yup
    .string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      (obj) => `${obj.value} is not a valid phone number`,
    )
    .required("Phone is required"),
  organization: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be less than 32 characters")
    .matches(
      /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ-_.]+$/,
      "Must contain only letters, numbers, and symbols(-_.)",
    )
    .required("Organization is required"),
  streetAddress: yup.string().required("Address is required"),
  postalCode: yup
    .string()
    .matches(
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      (obj) => `${obj.value} is not a valid postal code`,
    )
    .required("Postal code is required"),
  city: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .required("City is required"),
  province: yup.string().required("Province is required"),
});
