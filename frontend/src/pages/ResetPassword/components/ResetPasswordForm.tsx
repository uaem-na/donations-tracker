import { Alert, AlertTypes } from "@components/Alert";
import { Button, Input, Label } from "@components/Controls";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordMutation } from "@store/services/api";
import { getErrorMessage } from "@utils/GetErrorMessage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "./schemas/ResetPasswordSchema";

type ResetPasswordFormProps = {
  userId: string;
  token: string;
};

type ServerMessage = {
  type: AlertTypes;
  message: string;
};

export const ResetPasswordForm = ({
  userId,
  token,
}: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const [resetPasswordApi, { isLoading, isSuccess, error, data }] =
    useResetPasswordMutation();
  const [serverMessage, setServerMessage] = useState<ServerMessage | null>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    const { password, confirmPassword } = data;
    resetPasswordApi({ userId, token, password, confirmPassword });
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage({
        type: "success",
        message: data?.message ?? "Password reset successfully.",
      });

      navigate("/login");
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
        <Label htmlFor="password">Password</Label>
        <div className="mt-2">
          <Input
            {...register("password")}
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            errorMessage={errors.password?.message}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <div className="mt-2">
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm your password"
            errorMessage={errors.confirmPassword?.message}
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
