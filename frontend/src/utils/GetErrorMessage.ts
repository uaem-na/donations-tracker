import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import i18n from "i18next";

type ErrorWithMessage = {
  message: string;
};

type ErrorWithErrors = {
  errors: string[];
};

const hasMessage = (errorData: unknown): errorData is ErrorWithMessage => {
  return (errorData as ErrorWithMessage).message !== undefined;
};

const hasErrors = (errorData: unknown): errorData is ErrorWithErrors => {
  return (errorData as ErrorWithErrors).errors !== undefined;
};

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError,
) => {
  const defaultErrorMessage = i18n.t("errors.unknown_server_error");
  if (!("status" in error)) {
    return error.message ?? defaultErrorMessage;
  }

  let message = "";
  if (hasMessage(error.data)) {
    message = i18n.exists(error.data.message)
      ? i18n.t(error.data.message)
      : error.data.message;
  }

  if (hasErrors(error.data) && error.data.errors.length > 0) {
    const translatedErrors = error.data.errors.map((err) =>
      i18n.exists(err) ? i18n.t(err) : err,
    );

    // TODO: if message should be included as part of the error message update here
    message = translatedErrors.join(", ");
  }

  return message || defaultErrorMessage;
};
