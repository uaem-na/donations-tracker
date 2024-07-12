import { Alert } from "@components/Alert";
import { Button, Input, Label } from "@components/Controls";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useLoginMutation,
} from "@services/api";
import { getErrorMessage } from "@utils/GetErrorMessage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "./schemas/LoginSchema";

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: currentSession, isLoading } = useGetSessionQuery();
  const [getSessionAfterLogin, { data: afterLoginSession }] =
    useLazyGetSessionQuery();
  const [loginApi, { isLoading: isLoggingIn, isSuccess, error }] =
    useLoginMutation();
  const [serverMessage, setServerMessage] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const { username, password } = data;
    loginApi({ username, password });
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage("");
      getSessionAfterLogin();
    }
  }, [getSessionAfterLogin, isSuccess]);

  // handle server error message
  useEffect(() => {
    if (error) {
      setShowResetPassword(true);
      const message = getErrorMessage(error);
      setServerMessage(message);
    } else {
      setShowResetPassword(false);
    }
  }, [error]);

  // redirect to account page on session refresh
  useEffect(() => {
    if (afterLoginSession) {
      navigate("/account/dashboard");
    }
  }, [afterLoginSession, navigate]);

  // redirect to account page if session exists
  useEffect(() => {
    if (currentSession) {
      navigate("/account/dashboard");
    }
  }, [currentSession, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverMessage && (
        <div>
          <Alert type="error">{serverMessage}</Alert>
        </div>
      )}

      <div>
        <Label htmlFor="username">{t("login.username")}</Label>
        <div className="mt-2">
          <Input
            {...register("username")}
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder={t("login.username")}
            required
            errorMessage={errors.username?.message}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="password">{t("login.password")}</Label>
        <div className="mt-2">
          <Input
            {...register("password")}
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("login.password")}
            required
            errorMessage={errors.password?.message}
          />
        </div>
      </div>

      {showResetPassword && (
        <div>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            <Link to="/forgot-password">Click here to reset your password</Link>
          </p>
        </div>
      )}

      <div>
        <Button
          disabled={isLoggingIn}
          type="submit"
          className="flex w-full justify-center"
        >
          {t("login.sign_in")}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
