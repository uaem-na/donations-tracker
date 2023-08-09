import { Alert } from "@components";
import { Button, Input, Tooltip } from "@components/Controls";
import { useToast } from "@components/Toast";
import { updateUserInfoSchema } from "@features/YupSchemas";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useGetSessionQuery, useUpdateUserMutation } from "@services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const UpdateUserInfoForm = () => {
  const toast = useToast();
  const { data: session } = useGetSessionQuery();
  const [updateUserApi, { isLoading: isUpdating, isSuccess, error }] =
    useUpdateUserMutation();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(updateUserInfoSchema),
    ...(session && {
      defaultValues: {
        firstName: session.firstName,
        lastName: session.lastName,
      },
    }),
  });

  const onSubmit = (data) => {
    updateUserApi(data);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage("");
      toast.open({
        type: "success",
        duration: 5,
        content: "Your personal information has been successfully changed!",
      });
    }
  }, [isSuccess]);

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

  const Heading = (text: string) => {
    return (
      <div className="md:col-span-1">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {text}
        </h2>
      </div>
    );
  };

  return (
    <form
      className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {Heading("Personal Information")}

      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <Label htmlFor="username">Username</Label>
            <div className="mt-2">
              <Input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                placeholder="username"
                disabled={true}
                value={session?.username}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <Label htmlFor="firstName">First name</Label>
            <div className="mt-2">
              <Input
                {...register("firstName")}
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                placeholder="First name"
                errorMessage={errors.firstName?.message}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <Label htmlFor="lastName">Last name</Label>
            <div className="mt-2">
              <Input
                {...register("lastName")}
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                placeholder="Last name"
                errorMessage={errors.lastName?.message}
              />
            </div>
          </div>

          <div className="col-span-full">
            <Label htmlFor="email">
              <span className="mr-2">Email</span>
              <Tooltip
                asChild
                message={
                  "Please contact the administrator to update your email."
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
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                disabled={true}
                value={session?.email}
              />
            </div>
          </div>
        </div>
      </div>

      {Heading("Organization")}

      <div className="md:col-span-2">
        <div className="col-span-full">
          {/*<Label htmlFor="organization">*/}
          {/*  <span className="mr-2">Organization</span>*/}
          {/*  <Tooltip*/}
          {/*    asChild*/}
          {/*    message={*/}
          {/*      "Please contact the administrator to update your organization."*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <FontAwesomeIcon*/}
          {/*      className=" text-gray-6400"*/}
          {/*      icon={faInfoCircle}*/}
          {/*    />*/}
          {/*  </Tooltip>*/}
          {/*</Label>*/}
          {/*<div className="mt-2">*/}
          {/*  <Input*/}
          {/*    id="organization"*/}
          {/*    name="organization"*/}
          {/*    type="text"*/}
          {/*    disabled={true}*/}
          {/*    placeholder="Set your organization"*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="mt-2">
            <Alert type="info">Coming soon!</Alert>
          </div>
        </div>
      </div>

      <div className="md:col-start-2 md:col-span-2">
        {serverMessage && <Alert type="error">{serverMessage}</Alert>}

        <div className="mt-2 flex">
          <Button type="submit" disabled={isUpdating}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
