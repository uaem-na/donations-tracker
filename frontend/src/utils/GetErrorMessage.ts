import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
  error: FetchBaseQueryError | SerializedError
) => {
  if (!("status" in error)) {
    return (
      error.message ??
      "An unknown error occurred. Please contact the administrator."
    );
  }

  if (hasMessage(error.data)) {
    return error.data.message;
  }

  if (hasErrors(error.data)) {
    return error.data.errors.join(", ");
  }

  return "An unknown error occurred. Please contact the administrator.";
};
