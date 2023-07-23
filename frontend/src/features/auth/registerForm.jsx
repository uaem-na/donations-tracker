import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormInputText } from "../../components/common/inputs";
import { QUERIES } from "../../constants";
import {
  useLazyGetSessionQuery,
  useRegisterMutation,
} from "../../store/services/auth";
import { registerSchema } from "../yupSchemas";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [
    registerApi,
    { isLoading: isRegistering, isSuccess, isError, error: serverError },
  ] = useRegisterMutation();
  const [getSession, { data: session }] = useLazyGetSessionQuery();
  const [errorMessage, setErrorMessage] = useState("");

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    // TODO: property validation
    registerApi(data);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setErrorMessage("");
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
      setErrorMessage(message || "An error occurred");
    }
  }, [isError, serverError]);

  // redirect to account page on session refresh
  useEffect(() => {
    if (session) {
      navigate("/account");
    }
  });

  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Header>UAEM</Header>
        <Subheader>Register for an account</Subheader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            name="username"
            control={control}
            label={"Username"}
            variant="outlined"
            autoComplete="username"
          />
          <FormInputText
            name="firstName"
            control={control}
            label={"First name"}
            variant="outlined"
            autoComplete="given-name"
          />
          <FormInputText
            name="lastName"
            control={control}
            label={"Last name"}
            variant="outlined"
            autoComplete="family-name"
          />
          <FormInputText
            name="email"
            control={control}
            label={"E-mail"}
            variant="outlined"
            autoComplete="email"
          />
          <FormInputText
            name="password"
            control={control}
            label={"Password"}
            variant="outlined"
            type="password"
            autoComplete="new-password"
          />
          <FormInputText
            name="confirmPassword"
            control={control}
            label={"Confirm password"}
            variant="outlined"
            type="password"
            autoComplete="new-password"
          />
          <Button
            variant="contained"
            size="large"
            disabled={isRegistering}
            type="submit"
          >
            Register
          </Button>
          {errorMessage && (
            <ServerMessage role="alert">{errorMessage}</ServerMessage>
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
  color: var(--color-error);
`;

export default RegisterForm;
