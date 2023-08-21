import { Alert } from "@components/Alert";
import { Button, Input, Label } from "@components/Controls";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useLoginMutation,
} from "@services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "./schemas/LoginSchema";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { data: currentSession, isLoading } = useGetSessionQuery();
  const [getSessionAfterLogin, { data: afterLoginSession }] =
    useLazyGetSessionQuery();
  const [loginApi, { isLoading: isLoggingIn, isSuccess, error }] =
    useLoginMutation();
  const [serverMessage, setServerMessage] = useState("");

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
      if ("status" in error) {
        const err: any = "error" in error ? error.error : error.data;
        setServerMessage(err.errors.join(",") ?? "An error occurred");
      } else {
        setServerMessage(error.message ?? "An error occurred");
      }
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
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          {serverMessage && <Alert type="error">{serverMessage}</Alert>}
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <div className="mt-2">
            <Input
              {...register("username")}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              required
              errorMessage={errors.username?.message}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-2">
            <Input
              {...register("password")}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              errorMessage={errors.password?.message}
            />
          </div>
        </div>

        <div>
          <Button
            disabled={isLoggingIn}
            type="submit"
            className="flex w-full justify-center"
          >
            Sign in
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
