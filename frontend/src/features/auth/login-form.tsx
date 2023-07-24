import { Alert } from "@components/alert";
import { Input, Label } from "@components/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useLazyGetSessionQuery,
  useLoginMutation,
} from "../../store/services/auth";
import { loginSchema } from "../yupSchemas";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loginApi, { isLoading: isLoggingIn, isSuccess, error }] =
    useLoginMutation();
  const [getSession, { data: session }] = useLazyGetSessionQuery();
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
      getSession({});
    }
  }, [getSession, isSuccess]);

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
    if (session) {
      navigate("/account");
    }
  }, [session, navigate]);

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverMessage && <Alert type="error">{serverMessage}</Alert>}

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
          <button
            disabled={isLoggingIn}
            type="submit"
            className="flex w-full justify-center rounded-md bg-purple-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
