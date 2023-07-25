import { Alert, Button, Tooltip } from "@components";
import { Input } from "@components/Forms";
import { updateUserInfoSchema } from "@features/YupSchemas";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useGetSessionQuery } from "@services/auth";
import { useUpdateUserMutation } from "@services/users";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export const UpdateUserInfoForm = () => {
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
      // TODO: display a success toast
      alert("successfully updated");
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

  return (
    <form
      className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="md:col-span-1">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
      </div>

      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <Input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                placeholder="username"
                disabled={true}
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
            <Label htmlFor="last-name">Last name</Label>
            <div className="mt-2">
              <Input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
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
                disabled={true}
                value={user?.email}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Organization
        </h2>
      </div>

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

      <div className="md:col-start-2">
        <div className="mt-8 flex">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
    // <Form onSubmit={handleSubmit(onSubmit)}>
    //   <InputGroup>
    //     <InputLabel htmlFor="firstName">First name</InputLabel>
    //     <TextInput
    //       {...register("firstName")}
    //       id="firstName"
    //       type="text"
    //       autoComplete="given-name"
    //       placeholder="First name"
    //       errorMessage={errors.firstName?.message}
    //     />
    //   </InputGroup>
    //   <InputGroup>
    //     <InputLabel htmlFor="lastName">Last name</InputLabel>
    //     <TextInput
    //       {...register("lastName")}
    //       id="lastName"
    //       type="text"
    //       autoComplete="family-name"
    //       placeholder="Last name"
    //       errorMessage={errors.lastName?.message}
    //     />
    //   </InputGroup>
    //   <Button disabled={isUpdating} type="submit">
    //     Update
    //   </Button>
    //   {serverMessage && (
    //     <ServerMessage role="alert">{serverMessage}</ServerMessage>
    //   )}
    // </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const InputLabel = styled(Label)`
  display: inline-flex;
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ServerMessage = styled.span`
  display: block;
  font-size: 1rem;
  color: var(--color-error);
`;

export default UpdateUserInfoForm;
