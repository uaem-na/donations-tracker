import styled from "styled-components";

const TextInput = styled.input`
  border: 1px solid var(--color-gray-800);
  border: ${({ isError }) => isError && "1px solid red"};
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 8px;
  margin-bottom: 4px;
  font-size: 1.1rem;

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

export default TextInput;
