import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Alert } from '@components';
import {
  Button,
  Input,
  Label,
  Tooltip,
} from '@components/Controls';
import { SelectInput } from '@components/Controls/Select';
import { Textarea } from '@components/Controls/Textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/Dialog';
import { PostType } from '@constants';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import {
  faCancel,
  faCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from '@radix-ui/react-dialog';
import {
  useDeletePostMutation,
  useEditPostMutation,
  useGetItemCategoriesQuery,
  useGetPostQuery,
} from '@services/api';

import { CreateEditPostSchema } from './schemas/CreateEditPostSchema';

type Type = (typeof PostType)[keyof typeof PostType];

interface EditPostFormProps {
  id: string;
  onError: (err) => void;
}

export const EditPostForm = ({ id, onError }: EditPostFormProps) => {
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
  const { data: categories } = useGetItemCategoriesQuery({ locale: "en" });
  const [
    editPostApi,
    { isLoading: isEditing, isSuccess: isEditSuccess, error: editError },
  ] = useEditPostMutation();

  const [deletePostApi, { isSuccess: isDeleteSuccess, error: deleteError }] =
    useDeletePostMutation();

  const [serverMessage, setServerMessage] = useState("");

  // keep track of checkbox value for donation
  const [isDonation, setIsDonation] = useState(false);
  const [showPriceTooltip, setShowPriceTooltip] = useState(false);

  const handleDonation = () => {
    setIsDonation((prev) => !prev);
    setValue("item.price", 0);
  };

  const toggleShowPriceTooltip = () => {
    setShowPriceTooltip(!showPriceTooltip);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
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
      type: data.type,
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
      setValue("type", post.type, { shouldValidate: true });
      setValue("item", post.item, { shouldValidate: true });

      if (getValues("item.price") === 0) {
        setIsDonation(true);
        setValue("isDonation", true, { shouldValidate: true });
      }
    }

    if (isPostError) {
      onError(postError);
    }
  }, [isPostLoaded, isPostError]);

  // handle successful requests
  useEffect(() => {
    if (isEditSuccess || isDeleteSuccess) {
      navigate(`/posts/list`);
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
    <div className="container mx-auto">
      <div className="flex justify-end items-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              intent="danger"
              className="flex gap-1.5 justify-center items-center"
            >
              <FontAwesomeIcon icon={faTrash} />
              {t("delete")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("posts.delete_confirm_title")}</DialogTitle>
              <DialogDescription>
                {t("posts.delete_confirm_description")}
              </DialogDescription>
              <DialogFooter>
                <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-2">
                  <Button
                    type="button"
                    intent="danger"
                    className="flex gap-1.5 justify-center items-center"
                    onClick={onDelete}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    {t("delete")}
                  </Button>

                  <DialogClose asChild>
                    <Button
                      type="button"
                      intent="secondary"
                      className="flex gap-1.5 justify-center items-center"
                    >
                      <FontAwesomeIcon icon={faCancel} />
                      {t("cancel")}
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          {serverMessage && <Alert type="error">{serverMessage}</Alert>}
        </div>

        <div>
          <Label htmlFor="type">{t("posts.type")}</Label>
          <div className="mt-2">
            <SelectInput
              {...register(`type`)}
              options={Object.keys(PostType).map((k) => {
                return {
                  value: k.toLowerCase(),
                  label: t(`posts.${PostType[k]}`),
                };
              })}
              placeholder={t("posts.select_type")}
              disabled
            />
          </div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-6">
          <div>
            <Label htmlFor="isDonation">{t("posts.donation")}</Label>
            <div className="flex">
              <Input
                {...register(`isDonation`)}
                id="isDonation"
                type="checkbox"
                className="w-6 h-6"
                onChange={handleDonation}
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
                  categories?.map((category) => ({
                    value: category.value,
                    label: category.label,
                  })) ?? []
                }
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
            <Label htmlFor="price">
              {t("posts.price.label")}
              <Tooltip asChild message={t("posts.price_tooltip")}>
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  className="mx-2"
                  onMouseEnter={toggleShowPriceTooltip}
                  onMouseLeave={toggleShowPriceTooltip}
                />
              </Tooltip>
            </Label>
            <div className="mt-2">
              <Input
                {...register(`item.price`, { disabled: isDonation })}
                id="price"
                type="number"
                errorMessage={errors.item?.price?.message}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="description">{t("posts.description")}</Label>
          <div className="mt-2">
            <Textarea
              {...register(`item.description`)}
              id="description"
              errorMessage={errors.item?.description?.message}
            />
          </div>
        </div>

        <div className="inline-flex justify-start">
          <Button
            disabled={isEditing}
            type="submit"
            className="flex gap-1.5 justify-center items-center"
          >
            <FontAwesomeIcon icon={faCheck} />
            {t("submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};
