import { TFunction } from "i18next";
import * as yup from "yup";

const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

export const CreateEditPostSchema = (t: TFunction) => {
  return yup.object().shape({
    type: yup.string(),
    location: yup.object().shape({
      postalCode: yup
        .string()
        .matches(postalCodeRegex, t("validation:postal_code.invalid"))
        .required(
          t("validation:field_required", { field: t("posts.postal_code") }),
        ),
    }),
    isDonation: yup
      .boolean()
      .default(false)
      .required(t("validation:field_required", { field: t("posts.donation") })),
    item: yup.object().shape({
      name: yup
        .string()
        .min(1, t("validation:string.too_short", { min: 1 }))
        .max(256, t("validation:string.too_long", { max: 256 }))
        .required(t("validation:field_required", { field: t("posts.name") })),
      quantity: yup
        .number()
        .typeError(
          t("validation:number.type_mismatch", { field: t("posts.quantity") }),
        )
        .default(1)
        .min(1, t("validation:number.too_small", { min: 1 }))
        .required(
          t("validation:field_required", { field: t("posts.quantity") }),
        ),
      price: yup
        .number()
        .typeError(
          t("validation:number.type_mismatch", { field: t("posts.price") }),
        )
        .default(0)
        .min(0, t("validation:number.too_small", { min: 0 }))
        .required(t("validation:field_required", { field: t("posts.price") })),
      description: yup
        .string()
        .min(1, t("validation:string.too_short", { min: 1 }))
        .max(1024, t("validation:string.too_long", { max: 1024 }))
        .required(
          t("validation:field_required", { field: t("posts.description") }),
        ),
      category: yup
        .string()
        .required(
          t("validation:field_required", { field: t("posts.category") }),
        ),
      // ! we do not support image upload yet... perhaps need Google Cloud Storage
      image: yup
        .mixed()
        .nullable()
        .test("fileSize", t("validation:file.too_big", { max: 1 }), (value) => {
          if (value && "size" in value && typeof value.size === "number") {
            return value.size <= 1024 * 1024 * 1; // * 1MB or less
          }
          return true;
        })
        .test("fileType", t("validation:file.not_supported"), (value) => {
          if (value && "type" in value && typeof value.type === "string") {
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value.type,
            );
          }
          return true;
        }),
    }),
  });
};
