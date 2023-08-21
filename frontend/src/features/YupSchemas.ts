import * as yup from "yup";

import YupPassword from "yup-password";
YupPassword(yup); // ! extend yup for password validation

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be less than 32 characters")
    .required("Username is required"),
  password: yup.string().required("Password is required for login"),
});
