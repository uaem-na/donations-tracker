import * as yup from "yup";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../button";
import { Label } from "@radix-ui/react-label";
import { TextInput } from "../textInput";
import { useAuth } from "../auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

const FIELD_HEIGHT = "44px";

const UpdateUserInfoForm = () => {
  const { user, loading, updateUserInfo: updateUserInfoApi } = useAuth();
  const [error, setError] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const onSubmit = (data) => {
    updateUserInfoApi(data, (err) => {
      if (err) {
        setError(err);
      }
    });
  };

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
          height={FIELD_HEIGHT}
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
          height={FIELD_HEIGHT}
          errorMessage={errors.lastName?.message}
        />
      </InputGroup>
      <Button diabled={loading} type="submit">
        Update
      </Button>
      {error && <ServerMessage role="alert">{error}</ServerMessage>}
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
