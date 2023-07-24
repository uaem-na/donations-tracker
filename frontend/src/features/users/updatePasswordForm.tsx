import { Button } from "@components/common/button";
import { TextInput } from "@components/common/inputs";
import { updatePasswordSchema } from "@features/yupSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useChangePasswordMutation } from "@services/users";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export const UpdatePasswordForm = () => {
  const [changePasswordApi, { isLoading: loading, isSuccess, error }] =
    useChangePasswordMutation();
  const [serverMessage, setServerMessage] = useState("");

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
      setServerMessage("");
      reset();
      // TODO: display a success toast
      alert("successfully updated");
    }
  }, [isSuccess, reset]);

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
        <InputLabel htmlFor="password">Current password</InputLabel>
        <TextInput
          {...register("password")}
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Current password"
          errorMessage={errors.password?.message}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel htmlFor="newPassword">New password</InputLabel>
        <TextInput
          {...register("newPassword")}
          id="newPassword"
          type="password"
          autoComplete="new-password"
          placeholder="New password"
          errorMessage={errors.newPassword?.message}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel htmlFor="confirmNewPassword">
          Confirm new password
        </InputLabel>
        <TextInput
          {...register("confirmNewPassword")}
          id="confirmNewPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your new password"
          errorMessage={errors.confirmNewPassword?.message}
        />
      </InputGroup>
      <Button
        backgroundColor={"var(--color-warn)"}
        disabled={loading}
        type="submit"
      >
        Change Password
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

export default UpdatePasswordForm;
