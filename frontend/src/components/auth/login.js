import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { Paper } from "../paper";
import { TextInput } from "../textInput";
import { QUERIES } from "../../constants";
import axios from "../../common/http-common";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("E-mail address is required for login"),
  password: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .required("Password is required for login"),
});

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post("/auth/login", data)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        const { data } = err.response;
        if (data) {
          const { error } = data;
          setServerError(error);
        } else {
          console.error(err, err.response);
        }
      });
  };

  return (
    <Wrapper>
      <ResponsivePaper>
        <Header>UAEM</Header>
        <Subheader>Sign in to your account</Subheader>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
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
            autoComplete="current-password"
            aria-invalid={errors.password ? "true" : "false"}
            isError={!!errors.password}
            placeholder="Password"
          />
          {errors.password && (
            <ErrorMessage role="alert">{errors.password.message}</ErrorMessage>
          )}

          <RegisterLink to="/register">Need to register?</RegisterLink>
          <Button type="submit">Sign in</Button>
          {serverError && (
            <ServerMessage role="alert">{serverError}</ServerMessage>
          )}
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

const RegisterLink = styled(Link)`
  color: var(--color-gray-300);
  font-size: 1rem;
  font-weight: 700;
  margin-top: 8px;
  margin-bottom: 8px;
  width: fit-content;
  align-self: center;

  &:hover {
    color: var(--color-gray-100);
  }
`;

export default Login;
