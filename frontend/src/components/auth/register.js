import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Label from "@radix-ui/react-label";
import { Button } from "../button";
import { Paper } from "../paper";
import { TextInput } from "../textInput";
import { QUERIES } from "../../constants";
import useAuth from "./useAuth";

YupPassword(yup); // extend yup

const schema = yup.object().shape({
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

const FIELD_HEIGHT = "44px";

const Register = () => {
  const { register: registerApi, loading, error } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    registerApi(data);
  };

  return (
    <Wrapper>
      <ResponsivePaper>
        <Header>UAEM</Header>
        <Subheader>Register for an account</Subheader>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
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
          <InputGroup>
            <InputLabel htmlFor="organization">Organization</InputLabel>
            <TextInput
              {...register("organization")}
              id="organization"
              type="text"
              autoComplete="organization"
              placeholder="Organization"
              height={FIELD_HEIGHT}
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
              autoComplete="new-password"
              placeholder="Password"
              height={FIELD_HEIGHT}
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
              height={FIELD_HEIGHT}
              errorMessage={errors.confirmPassword?.message}
            />
          </InputGroup>
          <Button
            disabled={loading}
            type="submit"
            style={{ marginTop: "28px" }}
          >
            Register
          </Button>
          {error && <ServerMessage role="alert">{error}</ServerMessage>}
        </RegisterForm>
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

const RegisterForm = styled.form`
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

export default Register;
