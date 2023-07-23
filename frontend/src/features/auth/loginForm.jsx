import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Link as MuiLink, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormInputText } from "../../components/common/inputs";
import { QUERIES } from "../../constants";
import {
  useLazyGetSessionQuery,
  useLoginMutation,
} from "../../store/services/auth";
import { loginSchema } from "../yupSchemas";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [
    loginApi,
    { isLoading: isLoggingIn, isSuccess, isError, error: serverError },
  ] = useLoginMutation();
  const [getSession, { data: session }] = useLazyGetSessionQuery();
  const [serverMessage, setServerMessage] = useState("");

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    // TODO: property validation
    const { username, password } = data;
    loginApi({ username, password });
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage("");
      getSession();
    }
  }, [getSession, isSuccess]);

  // handle server error message
  useEffect(() => {
    if (isError && serverError && serverError.data) {
      let message = serverError.data.message;
      if (serverError.data.errors && serverError.data.errors.length > 0) {
        // TODO: better error message when multiple errors
        message += serverError.data.errors.join(",");
      }
      setServerMessage(message || "An error occurred");
    }
  }, [isError, serverError]);

  // redirect to account page on session refresh
  useEffect(() => {
    if (session) {
      navigate("/account");
    }
  }, [session, navigate]);

  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Header>UAEM</Header>
        <Subheader>Sign in to your account</Subheader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            name="username"
            control={control}
            label={"Username"}
            variant="outlined"
            autoComplete="username"
          />
          <FormInputText
            name="password"
            control={control}
            label={"Password"}
            variant="outlined"
            type="password"
            autoComplete="current-password"
          />
          <Button
            variant="contained"
            size="large"
            disabled={isLoggingIn}
            type="submit"
          >
            Sign in
          </Button>
          <RegisterLink component={Link} to="/register">
            Need to register?
          </RegisterLink>
          {serverMessage && (
            <ServerMessage role="alert">{serverMessage}</ServerMessage>
          )}
        </Form>
      </StyledPaper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  @media ${QUERIES.phoneAndSmaller} {
    width: clamp(300px, 80vw, 600px);
  }
  width: 600px;
  padding: 24px;
  border-radius: 20px;
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

const ServerMessage = styled.span`
  display: block;
  font-size: 1rem;
  margin-top: 16px;
  color: var(--mui-palette-error-main);
`;

const RegisterLink = styled(MuiLink)`
  color: var(--mui-palette-grey-600);
  font-size: 1.1rem;
  font-weight: 600;
  width: fit-content;
  align-self: center;

  &:hover {
    color: var(--mui-palette-grey-800);
  }
`;

export default LoginForm;
