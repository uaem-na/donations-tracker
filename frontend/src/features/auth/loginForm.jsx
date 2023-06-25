import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Label from "@radix-ui/react-label";
import { Button } from "../../components/button";
import { Paper } from "../../components/paper";
import { TextInput } from "../../components/textInput";
import { QUERIES } from "../../constants";
import {
  useLazyGetSessionQuery,
  useLoginMutation,
} from "../../app/services/auth";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be less than 32 characters")
    .required("Username is required"),
  password: yup.string().required("Password is required for login"),
});

export const LoginForm = () => {
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [getSession, { data: session }] = useLazyGetSessionQuery();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (session) {
      navigate("/account");
    }
  }, [session, navigate]);

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      setErrorMessage("");
      await login({ username, password }).unwrap();
      await getSession().unwrap();
    } catch (err) {
      const { data } = err;
      if (data && data.errors) {
        setErrorMessage(data.errors.join(","));
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };

  return (
    <Wrapper>
      <ResponsivePaper>
        <Header>UAEM</Header>
        <Subheader>Sign in to your account</Subheader>
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
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextInput
              {...register("password")}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              errorMessage={errors.password?.message}
            />
          </InputGroup>
          <Button disabled={isLoggingIn} type="submit">
            Sign in
          </Button>
          <RegisterLink to="/register">Need to register?</RegisterLink>
          {errorMessage && (
            <ServerMessage role="alert">{errorMessage}</ServerMessage>
          )}
        </Form>
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

const Form = styled.form`
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

export default LoginForm;
