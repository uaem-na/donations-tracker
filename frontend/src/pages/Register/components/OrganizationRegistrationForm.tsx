import { Alert } from "@components";
import { Button, Input, Label, Tooltip } from "@components/Controls";
import { SelectInput } from "@components/Controls/Select";
import { UserDiscriminator } from "@constants";
import { ProvinceName } from "@constants/Provinces";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useRegisterMutation,
} from "@services/api";
import { useEffect, useState } from "react";
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
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(registerOrganizationSchema),
  });

  const onSubmit = (data) => {
    data = {
      ...data,
      displayName: data.organization, // Display name will be the same as organization by default
      type: UserDiscriminator.ORGANIZATION,
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

  useEffect(() => {
    if (afterRegisterSession) {
      navigate("/account/dashboard");
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  /*
   * AUTO-FORMATTING
   * We want to keep the value consistence for phone and postal code
   * */
  const phoneFormatting = (event) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const value = event.target.value;
    if (phoneRegex.test(value)) {
      const formatted = value.replace(phoneRegex, "($1) $2-$3");
      setValue("phone", formatted);
    }
  };

  const postalCodeFormatting = (val: string) => {
    const postalCodeRegex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
    const value = val;
    if (postalCodeRegex.test(value)) {
      const formatted = value.toUpperCase().replace(postalCodeRegex, "$&");
      setValue("postalCode", formatted);
    }
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
        <Label htmlFor="phone">Phone</Label>
        <div className="mt-2">
          <Input
            {...register("phone")}
            onBlur={phoneFormatting}
            id="phone"
            type="phone"
            autoComplete="tel"
            placeholder="Phone"
            errorMessage={errors.phone?.message}
          />
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

      <div className="col-span-full">
        <Label htmlFor="organization">
          <span className="mr-2">Organization</span>
          <Tooltip
            asChild
            message={
              "This will be used as the display name i.e. must have only letters, numbers and symbols(-_.)."
            }
          >
            <FontAwesomeIcon
              tabIndex={0}
              className=" text-gray-6400"
              icon={faInfoCircle}
            />
          </Tooltip>
        </Label>
        <div className="mt-2">
          <Input
            {...register("organization")}
            id="organization"
            type="organization"
            autoComplete="organization-title"
            placeholder="Organization"
            errorMessage={errors.organization?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        <div className="md:col-span-2">
          <Label htmlFor="streetAddress">Address</Label>
          <div className="mt-2">
            <Input
              {...register("streetAddress")}
              id="streetAddress"
              type="text"
              autoComplete="street-address"
              placeholder="Address"
              errorMessage={errors.streetAddress?.message}
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <Label htmlFor="postalCode">
          <span className="mr-2">Postal Code</span>
            <Tooltip
            asChild
            message={
              "Please format all uppercase and no spaces. Eg: A1A1A1"
            }
          >
            <FontAwesomeIcon
              tabIndex={0}
              className=" text-gray-6400"
              icon={faInfoCircle}
            />
          </Tooltip>
            </Label>
          <div className="mt-2">
            <Input
              {...register("postalCode", {
                onBlur: (e) => postalCodeFormatting(e.target.value),
              })}
              id="postalCode"
              type="text"
              autoComplete="postal-code"
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
              autoComplete="address-level2"
              placeholder="City"
              errorMessage={errors.city?.message}
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
            autoComplete="address-level1"
            options={Object.keys(ProvinceName).map((p) => {
              return {
                label: ProvinceName[p],
                value: p,
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
