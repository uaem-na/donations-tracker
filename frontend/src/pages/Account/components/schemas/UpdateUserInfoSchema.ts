import * as yup from "yup";

export const updateUserInfoSchema = yup.object().shape({
  displayName: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be less than 32 characters")
    .matches(
      /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ-_.]+$/,
      "Must contain only letters, numbers, and symbols(-_.)"
    )
    .required("Display name is required"),
  firstName: yup
    .string()
    .min(1, "Must be 1 character or more")
    .max(32, "Must be less than 32 characters")
    .matches(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/,
      "Must contain only letters and symbols (-')"
    )
    .required("First name is required"),
  lastName: yup
    .string()
    .min(1, "Must be 1 character or more")
    .max(32, "Must be less than 32 characters")
    .matches(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/,
      "Must contain only letters and symbols (-')"
    )
    .required("Last name is required"),
});
