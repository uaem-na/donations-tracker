import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../button";
import { Paper } from "../paper";
import { TextInput } from "../textInput";
import { QUERIES } from "../../constants";
import useAuth from "./useAuth";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("E-mail address is required"),
  password: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  organization: yup.string().required("Organization is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

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
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <TextInput
            {...register("firstName")}
            type="text"
            autoComplete="given-name"
            aria-invalid={errors.firstName ? "true" : "false"}
            isError={!!errors.firstName}
            placeholder="First name"
          />
          {errors.firstName && (
            <ErrorMessage role="alert">{errors.firstName.message}</ErrorMessage>
          )}
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <TextInput
            {...register("lastName")}
            type="text"
            autoComplete="family-name"
            aria-invalid={errors.lastName ? "true" : "false"}
            isError={!!errors.lastName}
            placeholder="Last name"
          />
          {errors.lastName && (
            <ErrorMessage role="alert">{errors.lastName.message}</ErrorMessage>
          )}
          <label htmlFor="organization" className="sr-only">
            Organization
          </label>
          <TextInput
            {...register("organization")}
            type="text"
            autoComplete="organization"
            aria-invalid={errors.organization ? "true" : "false"}
            isError={!!errors.organization}
            placeholder="Organization"
          />
          {errors.organization && (
            <ErrorMessage role="alert">
              {errors.organization.message}
            </ErrorMessage>
          )}
          <TextInput
            {...register("email")}
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            isError={!!errors.email}
            placeholder="E-mail address"
          />
          {errors.email && (
            <ErrorMessage role="alert">{errors.email.message}</ErrorMessage>
          )}
          <TextInput
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.password ? "true" : "false"}
            isError={!!errors.password}
            placeholder="Password"
          />
          {errors.password && (
            <ErrorMessage role="alert">{errors.password.message}</ErrorMessage>
          )}
          <TextInput
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
            })}
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            isError={!!errors.confirmPassword}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <ErrorMessage role="alert">
              {errors.confirmPassword.message}
            </ErrorMessage>
          )}
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
`;

const ErrorMessage = styled.span`
  display: block;
  font-size: 1rem;
  margin-bottom: 8px;
  color: red;
`;

const ServerMessage = styled.span`
  display: block;
  font-size: 1rem;
  margin-top: 16px;
  color: red;
`;

export default Register;
