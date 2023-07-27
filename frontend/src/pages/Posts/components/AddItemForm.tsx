import { Button, Input, Label } from "@components/Controls";
import { yupResolver } from "@hookform/resolvers/yup";
import { TFunction } from "i18next";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface AddItemFakeFormProps {
  onAdd: (data: any) => void;
}

const getSchema = (t: TFunction) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(1, t("validation:string.too_short", { min: 1 }))
      .max(256, t("validation:string.too_long", { max: 256 }))
      .required(t("validation:field_required", { field: t("posts.name") })),
    quantity: yup
      .number()
      .default(1)
      .min(1, t("validation:number.too_small", { min: 1 }))
      .required(t("validation:field_required", { field: t("posts.quantity") })),
    // * price is required for offers, but is not required for requests (set to 0)
    price: yup
      .number()
      .default(0)
      .min(0, t("validation:number.too_small", { min: 0 }))
      .required(t("validation:field_required", { field: t("posts.price") })),
    description: yup
      .string()
      .min(1, t("validation:string.too_short", { min: 1 }))
      .max(1024, t("validation:string.too_long", { max: 1024 }))
      .required(
        t("validation:field_required", { field: t("posts.description") })
      ),
    category: yup
      .string()
      .required(t("validation:field_required", { field: t("posts.category") })),
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
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }
        return true;
      }),
  });
};

export const AddItemFakeForm = ({ onAdd }: AddItemFakeFormProps) => {
  const { t } = useTranslation();
  const schema = useMemo(() => getSchema(t), [t]); // ! required for on the fly language change

  const {
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // manually mimic form submission
  const handleAdd = async (data) => {
    const result = await trigger(); // this manually calls validation on fields
    if (!result) {
      return;
    }

    onAdd(data);

    // TODO: this resets the whole form... is it even possible to reset only certain fields?
    reset();

    console.count("handleAdd");
  };

  // TODO: category should be a select input not a textbox
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">{t("posts.name")}</Label>
        <div className="mt-2">
          <Input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            required
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="quantity">{t("posts.quantity")}</Label>
        <div className="mt-2">
          <Input
            {...register("quantity")}
            id="quantity"
            name="quantity"
            type="number"
            required
            errorMessage={errors.quantity?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="price">{t("posts.price")}</Label>
        <div className="mt-2">
          <Input
            {...register("price")}
            id="price"
            name="price"
            type="number"
            required
            errorMessage={errors.price?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">{t("posts.description")}</Label>
        <div className="mt-2">
          <Input
            {...register("description")}
            id="description"
            name="description"
            type="text"
            required
            errorMessage={errors.description?.message}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="category">{t("posts.category")}</Label>
        <div className="mt-2">
          <Input
            {...register("category")}
            id="category"
            name="category"
            type="text"
            required
            errorMessage={errors.category?.message}
          />
        </div>
      </div>
      <Button onClick={handleAdd}>{t("add")}</Button>
    </div>
  );
};
