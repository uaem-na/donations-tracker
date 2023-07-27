import { Alert } from "@components";
import { Button, Input, Label } from "@components/Controls";
import { PostType } from "@constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePostMutation } from "@services/posts";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCreatePostFormSchema } from "./schemas/CreatePostFormSchema";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostTableProps {
  type: Type;
}

export const CreatePostForm = ({ type }: PostTableProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const schema = useMemo(() => getCreatePostFormSchema(t), [t]); // ! required for on the fly language change
  const [createPostApi, { isLoading: isCreating, isSuccess, error }] =
    useCreatePostMutation();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields: items, append } = useFieldArray({
    control,
    name: "items", // unique name for your Field Array
    rules: {
      required: true,
      minLength: 1,
    },
  });

  const EMPTY_ITEM = {
    name: "",
    quantity: 1,
    price: 0,
    description: "",
    category: "",
  };

  const onSubmit = async (data) => {
    // append type to data
    data.type = type;

    createPostApi(data);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      navigate(`/${type}s`);
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
        <Label htmlFor="title">{t("title")}</Label>
        <div className="mt-2">
          <Input
            {...register("title")}
            id="title"
            type="text"
            errorMessage={errors.title?.message}
          />
        </div>
      </div>

      {items.map((item, index) => {
        return (
          <div key={item.id} className="space-y-6">
            <div>
              <Label htmlFor="name">{t("posts.name")}</Label>
              <div className="mt-2">
                <Input
                  {...register(`items.${index}.name` as const)}
                  id="name"
                  type="text"
                  errorMessage={errors.items?.[index]?.name?.message}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="quantity">{t("posts.quantity")}</Label>
              <div className="mt-2">
                <Input
                  {...register(`items.${index}.quantity` as const)}
                  id="quantity"
                  type="number"
                  errorMessage={errors.items?.[index]?.quantity?.message}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="price">{t("posts.price")}</Label>
              <div className="mt-2">
                <Input
                  {...register(`items.${index}.price` as const)}
                  id="price"
                  type="number"
                  errorMessage={errors.items?.[index]?.price?.message}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">{t("posts.description")}</Label>
              <div className="mt-2">
                <Input
                  {...register(`items.${index}.description` as const)}
                  id="description"
                  type="text"
                  errorMessage={errors.items?.[index]?.description?.message}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">{t("posts.category")}</Label>
              <div className="mt-2">
                <Input
                  {...register(`items.${index}.category` as const)}
                  id="category"
                  type="text"
                  errorMessage={errors.items?.[index]?.category?.message}
                />
              </div>
            </div>
          </div>
        );
      })}
      <Button onClick={() => append(EMPTY_ITEM)}>{t("posts.add_item")}</Button>

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
