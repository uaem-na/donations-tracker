import { yupResolver } from "@hookform/resolvers/yup";
import * as Label from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import YupPassword from "yup-password";
import {
  useLazyGetSessionQuery,
  useRegisterMutation,
} from "../../app/services/auth";
import { Button } from "../../components/button";
import { Paper } from "../../components/paper";
import { TextInput } from "../../components/textInput";
import { QUERIES } from "../../constants";

YupPassword(yup); // extend yup

// TODO: central schema location
const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be less than 32 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("E-mail address is required"),
  password: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .max(256, "Must be less than 256 characters")
    .minLowercase(1, "Must contain at least 1 lowercase letter")
    .minUppercase(1, "Must contain at least 1 uppercase letter")
    .minNumbers(1, "Must contain at least 1 number")
    .minSymbols(1, "Must contain at least 1 symbol")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  organization: yup.string().required("Organization is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [
    registerApi,
    { isLoading: isRegistering, isSuccess, isError, error: serverError },
  ] = useRegisterMutation();
  const [getSession, { data: session }] = useLazyGetSessionQuery();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
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
      <ResponsivePaper>
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
            <InputLabel htmlFor="organization">Organization</InputLabel>
            <TextInput
              {...register("organization")}
              id="organization"
              type="text"
              autoComplete="organization"
              placeholder="Organization"
              errorMessage={errors.organization?.message}
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
          <Button
            disabled={isRegistering}
            type="submit"
            style={{ marginTop: "28px" }}
          >
            Register
          </Button>
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

export default RegisterForm;