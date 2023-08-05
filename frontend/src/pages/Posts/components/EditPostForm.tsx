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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CreateEditPostSchema } from "./schemas/CreateEditPostSchema";

type Type = (typeof PostType)[keyof typeof PostType];

interface EditPostFormProps {
  id: string;
  type: Type;
  onError: (err) => void;
}

export const EditPostForm = ({ id, type, onError }: EditPostFormProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const schema = useMemo(() => CreateEditPostSchema(t), [t]); // ! required for on the fly language change
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
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!post?.id) {
      onError({ status: 500, message: "Post ID must be available" });
      return;
    }
    editPostApi({
      id: post.id,
      location: {},
      type,
      item: data.item,
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
      setValue("item", post.item, { shouldValidate: true });
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
