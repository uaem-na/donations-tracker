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

export const registerSchema = yup.object().shape({
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
  // organization: yup.string().required("Organization is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .max(256, "Must be less than 256 characters")
    .minLowercase(1, "Must contain at least 1 lowercase letter")
    .minUppercase(1, "Must contain at least 1 uppercase letter")
    .minNumbers(1, "Must contain at least 1 number")
    .minSymbols(1, "Must contain at least 1 symbol")
    .required("Password is required"),
  newPassword: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .max(256, "Must be less than 256 characters")
    .minLowercase(1, "Must contain at least 1 lowercase letter")
    .minUppercase(1, "Must contain at least 1 uppercase letter")
    .minNumbers(1, "Must contain at least 1 number")
    .minSymbols(1, "Must contain at least 1 symbol")
    .required("Password is required"),
  confirmNewPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const updateUserInfoSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const createPostSchema = yup.object().shape({
  title: yup
    .string()
    .min(1, "Must be 1 characters or more")
    .max(256, "Must be less than 256 characters")
    .required("Title is required"),
  type: yup.string().oneOf(["request", "offer"]).required("Type is required"),
  items: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .min(1, "Must be 1 characters or more")
        .max(256, "Must be less than 256 characters")
        .required("Item name is required"),
      quantity: yup
        .number()
        .default(1)
        .min(1, "Must be 1 or more")
        .required("Quantity is required"),
      // * price is required for offers, but is not required for requests (set to 0)
      price: yup
        .number()
        .default(0)
        .min(0, "Must be 0 or more")
        .required("Price is required"),
      description: yup
        .string()
        .min(1, "Must be 1 characters or more")
        .max(1024, "Must be less than 1024 characters")
        .required("Description is required"),
      category: yup.string().required("Category is required"),
      // ! we do not support image upload yet... perhaps need Google Cloud Storage
      image: yup
        .mixed()
        .nullable()
        .test("fileSize", "File size too large (1MB or less)", (value) => {
          if (value && "size" in value && typeof value.size === "number") {
            return value.size <= 1024 * 1024 * 1; // * 1MB or less
          }
          return true;
        })
        .test("fileType", "Unsupported File Format", (value) => {
          if (value && "type" in value && typeof value.type === "string") {
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value.type
            );
          }
          return true;
        }),
    })
  ),
});

export const addItemSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Must be 1 characters or more")
    .max(256, "Must be less than 256 characters")
    .required("Item name is required"),
  quantity: yup
    .number()
    .default(1)
    .min(1, "Must be 1 or more")
    .required("Quantity is required"),
  // * price is required for offers, but is not required for requests (set to 0)
  price: yup
    .number()
    .default(0)
    .min(0, "Must be 0 or more")
    .required("Price is required"),
  description: yup
    .string()
    .min(1, "Must be 1 characters or more")
    .max(1024, "Must be less than 1024 characters")
    .required("Description is required"),
  category: yup.string().required("Category is required"),
  // ! we do not support image upload yet... perhaps need Google Cloud Storage
  image: yup
    .mixed()
    .nullable()
    .test("fileSize", "File size too large (1MB or less)", (value) => {
      if (value && "size" in value && typeof value.size === "number") {
        return value.size <= 1024 * 1024 * 1; // * 1MB or less
      }
      return true;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value && "type" in value && typeof value.type === "string") {
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }
      return true;
    }),
});
