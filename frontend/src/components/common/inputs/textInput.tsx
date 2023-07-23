import PropTypes from "prop-types";
import { forwardRef } from "react";
import styled from "styled-components";
import { StyledInput } from "./styledInput";

const TextInput = forwardRef(({ errorMessage, ...rest }, ref) => {
  return (
    <InputWrapper>
      <StyledInput
        ref={ref}
        {...rest}
        aria-invalid={errorMessage ? "true" : "false"}
        isError={errorMessage ? true : false}
      />
      {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
    </InputWrapper>
  );
});

TextInput.propTypes = {
  height: PropTypes.string,
  errorMessage: PropTypes.string,
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

export default TextInput;
