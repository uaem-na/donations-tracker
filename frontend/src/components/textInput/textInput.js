import styled from "styled-components";
import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const getHeight = ({ height }) => {
  switch (height) {
    case "small":
      return "32px";
    case "medium":
      return "40px";
    case "large":
      return "48px";
    default:
      if (height && height.indexOf("px") > -1) return height;
      else return "40px";
  }
};

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
  flex-direction: column;
  gap: 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid var(--color-gray-800);
  border: ${({ isError }) => isError && "1px solid red"};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1.1rem;
  height: ${({ height }) => getHeight({ height })};

  &:focus {
    outline: ${({ isError }) => isError && "2px dotted red"};
  }

  &::placeholder {
    color: var(--color-gray-500);
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const ErrorMessage = styled.span`
  display: inline-flex;
  font-size: 1rem;
  margin-bottom: 8px;
  color: red;
  justify-content: flex-end;
`;

export default TextInput;
