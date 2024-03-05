import * as yup from "yup";

import YupPassword from "yup-password";
YupPassword(yup); // ! extend yup for password validation

export const resetPasswordSchema = yup.object().shape({
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
});
