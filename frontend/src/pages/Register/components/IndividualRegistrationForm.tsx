import { Alert } from "@components/Alert";
import { Button, Input, Label } from "@components/Controls";
import { UserDiscriminator } from "@constants";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useRegisterMutation,
} from "@services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerIndividualSchema } from "./schemas/RegisterIndividualSchema";

export const IndividualRegistrationForm = () => {
  const navigate = useNavigate();
  const { data: currentSession, isLoading } = useGetSessionQuery();
  const [getSessionAfterRegister, { data: afterRegisterSession }] =
    useLazyGetSessionQuery();
  const [registerApi, { isLoading: isRegistering, isSuccess, error }] =
    useRegisterMutation();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerIndividualSchema),
  });

  const onSubmit = (data) => {
    data = {
      ...data,
      type: UserDiscriminator.INDIVIDUAL,
    };
    registerApi(data);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage("");
      getSessionAfterRegister();
    }
  }, [getSessionAfterRegister, isSuccess]);

  // handle server error message
  useEffect(() => {
    if (error) {
      if ("status" in error) {
        const err: any = "error" in error ? error.error : error.data;
        err.errors.length > 0
          ? setServerMessage(err.errors.join(",") ?? "An error occurred")
          : setServerMessage(err.message ?? "An error occurred");
      } else {
        setServerMessage(error.message ?? "An error occurred");
      }
    }
  }, [error]);

  // redirect to account page on session refresh
  useEffect(() => {
    if (afterRegisterSession) {
      navigate("/account/dashboard");
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>{serverMessage && <Alert type="error">{serverMessage}</Alert>}</div>

      <div>
        <Label htmlFor="username">Username</Label>
        <div className="mt-2">
          <Input
            {...register("username")}
            id="username"
            type="text"
            autoComplete="username"
            placeholder="Username"
            errorMessage={errors.username?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <div className="mt-2">
            <Input
              {...register("firstName")}
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              errorMessage={errors.firstName?.message}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="lastName">Last name</Label>
          <div className="mt-2">
            <Input
              {...register("lastName")}
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              errorMessage={errors.lastName?.message}
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <div className="mt-2">
          <Input
            {...register("email")}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            errorMessage={errors.email?.message}
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
          disabled={isRegistering}
          type="submit"
          className="flex w-full justify-center"
        >
          Register
        </Button>
      </div>
    </form>
  );
};
