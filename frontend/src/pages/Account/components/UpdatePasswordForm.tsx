import { Alert, AlertTypes } from "@components/Alert";
import { Button, Input } from "@components/Controls";
import { useToast } from "@components/Toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useChangePasswordMutation } from "@services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "utils/GetErrorMessage";
import { updatePasswordSchema } from "./schemas/UpdatePasswordSchema";

type ServerMessage = {
  type: AlertTypes;
  message: string;
};
const Heading = (text: string) => {
  return (
    <div className="md:col-span-1">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {text}
      </h2>
    </div>
  );
};

export const UpdatePasswordForm = () => {
  const toast = useToast();
  const [changePasswordApi, { isLoading: loading, isSuccess, error }] =
    useChangePasswordMutation();
  const [serverMessage, setServerMessage] = useState<ServerMessage | null>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = (data) => {
    changePasswordApi(data);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage({
        type: "success",
        message: "Your password has been successfully changed!",
      });
    }
  }, [isSuccess, reset]);

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
    <>
      <form
        className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {Heading("Change password")}

        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <Label htmlFor="password">Current password</Label>
              <div className="mt-2">
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Current password"
                  errorMessage={errors.password?.message}
                />
              </div>
            </div>

            <div className="col-span-full">
              <Label htmlFor="newPassword">New password</Label>
              <div className="mt-2">
                <Input
                  {...register("newPassword")}
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="New password"
                  errorMessage={errors.newPassword?.message}
                />
              </div>
            </div>

            <div className="col-span-full">
              <Label htmlFor="confirmNewPassword">Confirm new password</Label>
              <div className="mt-2">
                <Input
                  {...register("confirmNewPassword")}
                  id="confirmNewPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your new password"
                  errorMessage={errors.confirmNewPassword?.message}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-start-2 md:col-span-2">
          {serverMessage && <Alert type={serverMessage.type}>{serverMessage.message}</Alert>}

          <div className="mt-2 flex">
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
