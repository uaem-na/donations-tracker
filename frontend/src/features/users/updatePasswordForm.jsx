import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../../components/common/button";
import { TextInput } from "../../components/common/inputs";
import { useChangePasswordMutation } from "../../store/services/users";
import { updatePasswordSchema } from "../yupSchemas";

export const UpdatePasswordForm = () => {
  const [
    changePasswordApi,
    { isLoading: loading, isSuccess, isError, error: serverError },
  ] = useChangePasswordMutation();
  const [errorMessage, setErrorMessage] = useState("");

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
    // updatePasswordApi(data, (err) => {
    //   if (err) {
    //     setError(err);
    //   } else {
    //     // succeeded
    //     setError(undefined);
    //     reset();
    //   }
    // });
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setErrorMessage("");
      reset();
      // TODO: display a success toast
      alert("successfully updated");
    }
  }, [isSuccess, reset]);

  // handle server error message
  useEffect(() => {
    if (isError && serverError && serverError.data) {
      let message = serverError.data.message;
      if (serverError.data.errors && serverError.data.errors.length > 0) {
        // TODO: better error message when multiple errors
        message += serverError.data.errors.join(",");
      }
      setErrorMessage(message || "An error occurred");
    }
  }, [isError, serverError]);

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
      {errorMessage && (
        <ServerMessage role="alert">{errorMessage}</ServerMessage>
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
