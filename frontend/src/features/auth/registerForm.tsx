import { Button } from "@components/common/button";
import { TextInput } from "@components/common/inputs";
import { Paper } from "@components/common/paper";
import { registerSchema } from "@features/yupSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Label from "@radix-ui/react-label";
import { useLazyGetSessionQuery, useRegisterMutation } from "@services/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerApi, { isLoading: isRegistering, isSuccess, error }] =
    useRegisterMutation();
  const [getSession, { data: session }] = useLazyGetSessionQuery();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    registerApi(data);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage("");
      getSession({});
    }
  }, [getSession, isSuccess]);

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

  // redirect to account page on session refresh
  useEffect(() => {
    if (session) {
      navigate("/account");
    }
  });

  return (
    <Wrapper>
      <Paper>
        <Header>UAEM</Header>
        <Subheader>Register for an account</Subheader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <InputLabel htmlFor="username">Username</InputLabel>
            <TextInput
              {...register("username")}
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              errorMessage={errors.username?.message}
            />
          </InputGroup>
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
          <InputGroup>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <TextInput
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="E-mail"
              errorMessage={errors.email?.message}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextInput
              {...register("password")}
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              errorMessage={errors.password?.message}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
            <TextInput
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              errorMessage={errors.confirmPassword?.message}
            />
          </InputGroup>
          <Button disabled={isRegistering} type="submit">
            Register
          </Button>
          {serverMessage && (
            <ServerMessage role="alert">{serverMessage}</ServerMessage>
          )}
        </Form>
      </Paper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
`;

const Subheader = styled.h3`
  font-size: 2rem;
  text-align: center;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const InputLabel = styled(Label.Root)`
  display: inline-flex;
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ServerMessage = styled.span`
  display: block;
  font-size: 1rem;
  margin-top: 16px;
  color: var(--color-error);
`;

export default RegisterForm;
