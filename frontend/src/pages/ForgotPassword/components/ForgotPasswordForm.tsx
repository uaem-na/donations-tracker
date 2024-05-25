import { Alert, AlertTypes } from "@components/Alert";
import { Button, Input, Label } from "@components/Controls";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPasswordMutation } from "@store/services/api";
import { getErrorMessage } from "@utils/GetErrorMessage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "./schemas/ForgotPasswordSchema";

type ServerMessage = {
  type: AlertTypes;
  message: string;
};

export const ForgotPasswordForm = () => {
  const [forgotPasswordApi, { isLoading, isSuccess, error, data }] =
    useForgotPasswordMutation();
  const [serverMessage, setServerMessage] = useState<ServerMessage | null>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: { email: string }) => {
    const { email } = data;
    forgotPasswordApi({ email });
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage({
        type: "success",
        message: data?.message ?? "Password reset successfully.",
      });
    }
  }, [isSuccess, data]);

  // handle server error message
  useEffect(() => {
    if (error) {
      const message = getErrorMessage(error);
      setServerMessage({
        type: "error",
        message: message,
      });
    }
  }, [error]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverMessage && (
        <div>
          <Alert type={serverMessage.type}>{serverMessage.message}</Alert>
        </div>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <div className="mt-2">
          <Input
            {...register("email")}
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            placeholder="Email"
            required
            errorMessage={errors.email?.message}
          />
        </div>
      </div>

      <div>
        <Button
          disabled={isLoading}
          type="submit"
          className="flex w-full justify-center"
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
};
