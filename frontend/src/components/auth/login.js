import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Label from "@radix-ui/react-label";
import { Button } from "../button";
import { Paper } from "../paper";
import { TextInput } from "../textInput";
import { QUERIES } from "../../constants";
import useAuth from "./useAuth";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("E-mail address is required for login"),
  password: yup.string().required("Password is required for login"),
});

const FIELD_HEIGHT = "44px";

const Login = () => {
  const { login: loginApi, loading, error } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    loginApi(email, password);
  };

  return (
    <Wrapper>
      <ResponsivePaper>
        <Header>UAEM</Header>
        <Subheader>Sign in to your account</Subheader>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <TextInput
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="E-mail address"
              height={FIELD_HEIGHT}
              errorMessage={errors.email?.message}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextInput
              {...register("password")}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              height={FIELD_HEIGHT}
              errorMessage={errors.password?.message}
            />
          </InputGroup>
          <Button disabled={loading} type="submit">
            Sign in
          </Button>
          <RegisterLink to="/register">Need to register?</RegisterLink>
          {error && <ServerMessage role="alert">{error}</ServerMessage>}
        </LoginForm>
      </ResponsivePaper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResponsivePaper = styled(Paper)`
  @media ${QUERIES.phoneAndSmaller} {
    width: clamp(300px, 80vw, 600px);
  }
  width: 600px;
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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  gap: 12px;
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

const RegisterLink = styled(Link)`
  color: var(--color-gray-300);
  font-size: 1.2rem;
  font-weight: 700;
  width: fit-content;
  align-self: center;

  &:hover {
    color: var(--color-gray-100);
  }
`;

export default Login;
