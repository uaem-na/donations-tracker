import { Button } from "@common/button";
import { Link } from "@common/link";
import { Paper } from "@common/paper";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Label from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextInput } from "../../components/common/inputs";
import {
  useLazyGetSessionQuery,
  useLoginMutation,
} from "../../store/services/auth";
import { loginSchema } from "../yupSchemas";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loginApi, { isLoading: isLoggingIn, isSuccess, error }] =
    useLoginMutation();
  const [getSession, { data: session }] = useLazyGetSessionQuery();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const { username, password } = data;
    loginApi({ username, password });
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
  }, [session, navigate]);

  return (
    <Wrapper>
      <Paper>
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
          <Link to="/register" className="text-lg self-center">
            Need to register?
          </Link>
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
  color: var(--mui-palette-error-main);
`;

export default LoginForm;
