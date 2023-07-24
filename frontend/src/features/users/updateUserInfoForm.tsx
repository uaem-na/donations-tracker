import { Button } from "@components/common/button";
import { TextInput } from "@components/common/inputs";
import { updateUserInfoSchema } from "@features/yupSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useGetSessionQuery } from "@services/auth";
import { useUpdateUserMutation } from "@services/users";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export const UpdateUserInfoForm = () => {
  const { data: session } = useGetSessionQuery({});
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputLabel htmlFor="firstName">First name</InputLabel>
        <TextInput
          {...register("firstName")}
          id="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          errorMessage={errors.firstName?.message}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel htmlFor="lastName">Last name</InputLabel>
        <TextInput
          {...register("lastName")}
          id="lastName"
          type="text"
          autoComplete="family-name"
          placeholder="Last name"
          errorMessage={errors.lastName?.message}
        />
      </InputGroup>
      <Button disabled={isUpdating} type="submit">
        Update
      </Button>
      {serverMessage && (
        <ServerMessage role="alert">{serverMessage}</ServerMessage>
      )}
    </Form>
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
