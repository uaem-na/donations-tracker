/**
 * A styled input component.
 *
 * Props:
 * - height: The height of the input. Can be "small", "medium", "large", or a pixel value.
 * - isError: Whether the input is in an error state.
 *
 * Default props:
 * - height: "medium"
 * - isError: false
 *
 * Examples:
 * <StyledInput />
 * <StyledInput height="small" />
 * <StyledInput isError />
 *
 * Usage:
 * This component uses styled-components to style the input. To customize the styles, you can pass
 * additional props to the StyledInput component.
 */

import styled from "styled-components";

export const getHeight = ({ height }) => {
  height = height || "medium";
  switch (height) {
    case "small":
      return "40px";
    case "medium":
      return "52px";
    case "large":
      return "64px";
    default:
      if (height && height.indexOf("px") > -1) return height;
      else return "var(--height-input)"; // * default value in case error in height prop
  }
};

export const StyledInput = styled.input`
  width: 100%;
  border: 1px solid var(--color-gray-800);
  border: ${({ isError }) => isError && "1px solid var(--color-error);"};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1.1rem;
  height: ${({ height }) => getHeight({ height })};

  &:focus {
    outline: ${({ isError }) => isError && "2px dotted var(--color-error);"};
  }

  &::placeholder {
    color: var(--color-gray-500);
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

export default StyledInput;
