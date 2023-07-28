import { Alert } from "@components";
import { Button, Input, Label } from "@components/Controls";
import { SelectInput } from "@components/Controls/Select";
import { ProvinceCode, ProvinceName } from "@constants/Provinces";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useRegisterMutation,
} from "@services/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerOrganizationSchema } from "./schemas/RegisterOrganizationSchema";

export const OrganizationRegistrationForm = () => {
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
    resolver: yupResolver(registerOrganizationSchema),
  });

  const onSubmit = (data) => {
    registerApi(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          ></Input>
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
        <Label htmlFor="organization">Organization</Label>
        <div className="mt-2">
          <Input
            {...register("organization")}
            id="organization"
            type="organization"
            autoComplete=""
            placeholder="Organization"
            errorMessage={errors.organization?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        <div className="md:col-span-2">
          <Label htmlFor="streetAddress">Street address</Label>
          <div className="mt-2">
            <Input
              {...register("streetAddress")}
              id="streetAddress"
              type="text"
              autoComplete=""
              placeholder="Street address"
              errorMessage={errors.streetAddress?.message}
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <Label htmlFor="postalCode">Postal code</Label>
          <div className="mt-2">
            <Input
              {...register("postalCode")}
              id="postalCode"
              type="text"
              autoComplete=""
              placeholder="Postal code"
              errorMessage={errors.postalCode?.message}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <Label htmlFor="city">City</Label>
          <div className="mt-2">
            <Input
              {...register("city")}
              id="city"
              type="text"
              autoComplete=""
              placeholder="City"
              errorMessage={errors.firstName?.message}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="province">Province</Label>
          <SelectInput
            {...register("province")}
            id="province"
            name="province"
            placeholder="Select a province"
            options={Object.keys(ProvinceName).map((p) => {
              return {
                label: ProvinceName[p],
                value: ProvinceCode[p],
              };
            })}
            errorMessage={errors.province?.message}
          ></SelectInput>
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
