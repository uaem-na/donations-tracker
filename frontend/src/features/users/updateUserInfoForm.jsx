import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { useGetSessionQuery } from "../../app/services/auth";
import { useUpdateUserMutation } from "../../app/services/users";
import { Button } from "../../components/button";
import { TextInput } from "../../components/textInput";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const UpdateUserInfoForm = () => {
  const { data: session } = useGetSessionQuery();
  const [
    updateUserApi,
    { isLoading: isUpdating, isSuccess, isError, error: serverError },
  ] = useUpdateUserMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: session && session.firstName,
      lastName: session && session.lastName,
    },
  });

  const onSubmit = (data) => {
    updateUserApi(data);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setErrorMessage("");
      // TODO: display a success toast
      alert("successfully updated");
    }
  }, [isSuccess]);

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
      <Button diabled={isUpdating} type="submit">
        Update
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

export default UpdateUserInfoForm;
