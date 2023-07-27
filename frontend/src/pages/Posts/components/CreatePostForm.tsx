import { Alert } from "@components";
import { Button, Input, Label } from "@components/Controls";
import { PostType } from "@constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { TFunction } from "i18next";
import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { AddItemFakeForm } from "./AddItemForm";
import { SelectInput } from "./SelectInput";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostTableProps {
  type: Type;
}

const getSchema = (t: TFunction) => {
  return yup.object().shape({
    title: yup
      .string()
      .min(1, t("validation:string.too_short", { min: 1 }))
      .max(256, t("validation:string.too_long", { max: 256 }))
      .required(t("validation:field_required", { field: t("title") })),
    type: yup
      .string()
      .oneOf(["request", "offer"])
      .required(t("validation:field_required", { field: t("posts.type") })),
    items: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .min(1, t("validation:string.too_short", { min: 1 }))
          .max(256, t("validation:string.too_long", { max: 256 }))
          .required(t("validation:field_required", { field: t("posts.name") })),
        quantity: yup
          .number()
          .default(1)
          .min(1, t("validation:number.too_small", { min: 1 }))
          .required(
            t("validation:field_required", { field: t("posts.quantity") })
          ),
        // * price is required for offers, but is not required for requests (set to 0)
        price: yup
          .number()
          .default(0)
          .min(0, t("validation:number.too_small", { min: 0 }))
          .required(
            t("validation:field_required", { field: t("posts.price") })
          ),
        description: yup
          .string()
          .min(1, t("validation:string.too_short", { min: 1 }))
          .max(1024, t("validation:string.too_long", { max: 1024 }))
          .required(
            t("validation:field_required", { field: t("posts.description") })
          ),
        category: yup
          .string()
          .required(
            t("validation:field_required", { field: t("posts.category") })
          ),
        // ! we do not support image upload yet... perhaps need Google Cloud Storage
        image: yup
          .mixed()
          .nullable()
          .test(
            "fileSize",
            t("validation:file.too_big", { max: 1 }),
            (value) => {
              if (value && "size" in value && typeof value.size === "number") {
                return value.size <= 1024 * 1024 * 1; // * 1MB or less
              }
              return true;
            }
          )
          .test("fileType", t("validation:file.not_supported"), (value) => {
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
};

export const CreatePostForm = ({ type }: PostTableProps) => {
  const { t } = useTranslation();
  const schema = useMemo(() => getSchema(t), [t]); // ! required for on the fly language change
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields: items, append } = useFieldArray({
    control,
    name: "items", // unique name for your Field Array
  });

  const onItemAdd = (item) => {
    append(item);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>{serverMessage && <Alert type="error">{serverMessage}</Alert>}</div>

      <div>
        <Label htmlFor="title">{t("title")}</Label>
        <div className="mt-2">
          <Input
            {...register("title")}
            id="title"
            name="title"
            type="text"
            required
            errorMessage={errors.title?.message}
          />
        </div>
      </div>

      <div>
        <SelectInput
          name={t("posts.type")}
          placeholder={t("posts.select_post_type")}
          options={[
            {
              label: t("posts.request"),
              value: "request" as const,
            },
            {
              label: t("posts.offer"),
              value: "offer" as const,
            },
          ]}
        />
      </div>

      <AddItemFakeForm onAdd={onItemAdd} />

      <div>
        <Button type="submit" className="flex w-full justify-center">
          {t("posts.create")}
        </Button>
      </div>
    </form>
  );
};
