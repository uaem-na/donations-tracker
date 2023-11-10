import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Alert } from "@components";
import { Button, Input, Label, Tooltip } from "@components/Controls";
import { SelectInput } from "@components/Controls/Select";
import { Textarea } from "@components/Controls/Textarea";
import { PostType } from "@constants";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import {
  faFileSignature,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreatePostMutation,
  useGetItemCategoriesQuery,
} from "@services/api";

import { CreateEditPostSchema } from "./schemas/CreateEditPostSchema";

type Type = (typeof PostType)[keyof typeof PostType];

interface CreatePostFormProps {
  type: Type;
}

export const CreatePostForm = ({ type }: CreatePostFormProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const schema = useMemo(() => CreateEditPostSchema(t), [t]); // ! required for on the fly language change
  const { data: categories } = useGetItemCategoriesQuery({ locale: "en" });
  const [createPostApi, { isLoading: isCreating, isSuccess, error }] =
    useCreatePostMutation();
  const [serverMessage, setServerMessage] = useState("");

  // keep track of checkbox value for donation
  const [isDonation, setIsDonation] = useState(false);
  const [showPriceTooltip, setShowPriceTooltip] = useState(false);

  const handleDonation = () => {
    setIsDonation((prev) => !prev);
    setValue("item.price", 0);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // append type to data
    data.type = type;
    createPostApi(data);
  };

  const toggleShowPriceTooltip = () => {
    setShowPriceTooltip(!showPriceTooltip);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      navigate(`/posts`);
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
    <div className="container mx-auto">
      <div className="flex items-center justify-center mb-4">
        <h1 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {type === PostType.OFFER
            ? t("posts.new_offer")
            : t("posts.new_request")}
        </h1>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          {serverMessage && <Alert type="error">{serverMessage}</Alert>}
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-6">
          <div>
            <Label htmlFor="isDonation">{t("posts.donation")}?</Label>
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
              {t("posts.price")}
              <Tooltip asChild message={t("posts.price_tooltip")}>
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  className="mx-2"
                  onClick={toggleShowPriceTooltip}
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
          <div>
            <Label htmlFor="category">{t("posts.postal_code")}</Label>
            <div className="mt-2">
              <Input
                {...register(`location.postalCode`)}
                id="postalCode"
                type="text"
                errorMessage={errors.location?.postalCode?.message}
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
            disabled={isCreating}
            type="submit"
            className="flex gap-1.5 justify-center items-center"
          >
            {type === PostType.OFFER ? (
              <>
                <FontAwesomeIcon icon={faHandshake} />
                {t("posts.offer")}
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faFileSignature} />
                {t("posts.request")}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
