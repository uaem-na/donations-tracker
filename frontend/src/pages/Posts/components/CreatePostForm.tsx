import { Alert } from "@components";
import { Button, Input, Label } from "@components/Controls";
import { SelectInput } from "@components/Controls/Select";
import { PostType } from "@constants";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreatePostMutation,
  useGetItemCategoriesQuery,
} from "@services/api";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CreateEditPostSchema } from "./schemas/CreateEditPostSchema";

type Type = (typeof PostType)[keyof typeof PostType];

interface CreatePostFormProps {
  type: Type;
}

export const CreatePostForm = ({ type }: CreatePostFormProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const schema = useMemo(() => CreateEditPostSchema(t), [t]); // ! required for on the fly language change
  const { data: categories } = useGetItemCategoriesQuery();
  const [createPostApi, { isLoading: isCreating, isSuccess, error }] =
    useCreatePostMutation();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // append type to data
    data.type = type;

    createPostApi(data);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      navigate(`/posts/list`);
    }
  }, [isSuccess]);

  // handle server error message
  useEffect(() => {
    if (error) {
      if (!("status" in error)) {
        setServerMessage(error.message ?? t("errors.unknown_server_error"));
        return;
      }

      const err: any = "error" in error ? error.error : error.data;
      if (err.name === "ValidationError") {
        // error in errors has msg, path, location, value, type
        const errorMessages = err.errors.map(
          (error) =>
            `${error.msg}: ${error.location}.${error.path} = ${JSON.stringify(
              error.value
            )}`
        );
        setServerMessage(errorMessages.join(","));
      } else {
        err.errors.length > 0
          ? setServerMessage(
              err.errors.join(",") ?? t("errors.unknown_server_error")
            )
          : setServerMessage(err.message ?? t("errors.unknown_server_error"));
      }
    }
  }, [error]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>{serverMessage && <Alert type="error">{serverMessage}</Alert>}</div>
      <div>
        <Label htmlFor="name">{t("posts.name")}</Label>
        <div className="mt-2">
          <Input
            {...register(`item.name`)}
            id="name"
            type="text"
            errorMessage={errors.item?.name?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="quantity">{t("posts.quantity")}</Label>
        <div className="mt-2">
          <Input
            {...register(`item.quantity`)}
            id="quantity"
            type="number"
            errorMessage={errors.item?.quantity?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="price">{t("posts.price")}</Label>
        <div className="mt-2">
          <Input
            {...register(`item.price`)}
            id="price"
            type="number"
            errorMessage={errors.item?.price?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">{t("posts.description")}</Label>
        <div className="mt-2">
          <Input
            {...register(`item.description`)}
            id="description"
            type="text"
            errorMessage={errors.item?.description?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="category">{t("posts.category")}</Label>
        <div className="mt-2">
          <SelectInput
            {...register(`item.category`)}
            id="category"
            errorMessage={errors.item?.category?.message}
            placeholder={t("posts.select_category")}
            options={
              // TODO: i18n based on category string values (these are from backend)
              categories?.map((category) => ({
                value: category,
                label: category,
              })) ?? []
            }
          />
        </div>
      </div>

      <div>
        <Button
          disabled={isCreating}
          type="submit"
          className="flex w-full justify-center"
        >
          {t("posts.create")}
        </Button>
      </div>
    </form>
  );
};
