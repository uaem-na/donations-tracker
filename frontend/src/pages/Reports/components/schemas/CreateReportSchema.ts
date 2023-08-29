import { TFunction } from "i18next";
import * as yup from "yup";

export const CreateReportSchema = (t: TFunction) => {
  return yup.object().shape({
    notes: yup
      .string()
      .required(t("validation:field_required", { field: t("reports.notes") })),
  });
};
