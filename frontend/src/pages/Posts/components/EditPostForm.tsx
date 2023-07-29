import { Alert } from "@components";
import { Button, Input, Label } from "@components/Controls";
import { SelectInput } from "@components/Controls/Select";
import { PostType } from "@constants";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDeletePostMutation,
  useEditPostMutation,
  useGetItemCategoriesQuery,
  useGetPostQuery,
} from "@services/posts";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getEditPostFormSchema } from "./schemas/EditPostFormSchema";

type Type = (typeof PostType)[keyof typeof PostType];

interface EditPostFormProps {
  id: string;
  type: Type;
  onError: (err) => void;
}

export const EditPostForm = ({ id, type, onError }: EditPostFormProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const schema = useMemo(() => getEditPostFormSchema(t), [t]); // ! required for on the fly language change
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    isSuccess: isPostLoaded,
    error: postError,
  } = useGetPostQuery({ postId: id });
  const { data: categories } = useGetItemCategoriesQuery();

  const [
    editPostApi,
    { isLoading: isEditing, isSuccess: isEditSuccess, error: editError },
  ] = useEditPostMutation();

  const [deletePostApi, { isSuccess: isDeleteSuccess, error: deleteError }] =
    useDeletePostMutation();

  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
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
    if (!post?.id) {
      onError({ status: 500, message: "Post ID must be available" });
      return;
    }
    editPostApi({
      id: post.id,
      location: {},
      type,
      title: data.title,
      items: data.items,
    });
  };

  const onDelete = async () => {
    if (!post?.id) {
      onError({ status: 500, message: "Post ID must be available" });
      return;
    }
    deletePostApi({ id: post.id });
  };

  // if post is available, populate form
  useEffect(() => {
    if (isPostLoaded) {
      setValue("title", post.title, { shouldValidate: true });
      setValue("items", post.items, { shouldValidate: true });
    }

    if (isPostError) {
      onError(postError);
    }
  }, [isPostLoaded, isPostError]);

  // handle successful requests
  useEffect(() => {
    if (isEditSuccess || isDeleteSuccess) {
      navigate(`/${type}s`);
    }
  }, [isEditSuccess, isDeleteSuccess]);

  const handleServerErrors = (error) => {
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
  };

  // handle server error message
  useEffect(() => {
    if (editError) {
      handleServerErrors(editError);
    }
    if (deleteError) {
      handleServerErrors(deleteError);
    }
  }, [editError, deleteError]);

  if (isPostLoading) {
    return <div>Loading...</div>;
  }

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
                <SelectInput
                  {...register(`items.${index}.category` as const)}
                  id="category"
                  errorMessage={errors.items?.[index]?.category?.message}
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
          </div>
        );
      })}
      <div className="space-y-6">
        <Button onClick={() => append(EMPTY_ITEM)}>
          {t("posts.add_item")}
        </Button>
      </div>

      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button
          disabled={isEditing}
          type="submit"
          className="rounded-l-lg rounded-r-none border-r-1 border-solid border-r-1 border-gray-300"
        >
          {t("submit")}
        </Button>
        <Button
          disabled={isEditing}
          type="button"
          className="bg-red-500 hover:bg-red-900 focus:bg-red-900 rounded-l-none rounded-r-lg"
          onClick={onDelete}
        >
          {t("delete")}
        </Button>
      </div>
    </form>
  );
};
