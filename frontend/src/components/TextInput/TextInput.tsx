import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import styled from "styled-components";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  height?: string;
  errorMessage?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { errorMessage, ...rest },
  ref
) => {
  return (
    <InputWrapper>
      <input
        ref={ref}
        {...rest}
        aria-invalid={errorMessage ? "true" : "false"}
      />
      {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4px;
`;

const ErrorMessage = styled.span`
  display: inline-flex;
  font-size: 1rem;
  margin-bottom: 8px;
  color: var(--color-error);
  justify-content: flex-end;
`;

export const TextInput = forwardRef(Input);
