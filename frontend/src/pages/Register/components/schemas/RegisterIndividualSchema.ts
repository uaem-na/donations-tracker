import * as yup from "yup";
import { isProfane } from "utils/FilterProfaneWords";
import YupPassword from "yup-password";
YupPassword(yup); // ! extend yup for password validation

export const registerIndividualSchema = yup.object().shape({
  displayName: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be less than 32 characters")
    .matches(
      /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ-_.]+$/,
      "Must contain only letters, numbers, and symbols(-_.)",
    )
    .test(
      "test-word-profanity",
      "Display name cannot contain profane words",
      (value) => !isProfane(value!),
    )
    .required("Display name is required"),
  username: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be less than 32 characters")
    .test(
      "test-word-profanity",
      "Username cannot contain profane words",
      (value) => !isProfane(value!),
    )
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
    .test(
      "test-word-profanity",
      "First name cannot contain profane words",
      (value) => !isProfane(value!),
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
    .test(
      "test-word-profanity",
      "Last name cannot contain profane words",
      (value) => !isProfane(value!),
    )
    .required("Last name is required"),
});
