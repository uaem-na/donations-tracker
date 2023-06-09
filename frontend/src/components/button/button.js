import styled from "styled-components";

const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-gray-1000);
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.25rem;
  margin-top: 8px;
  padding: 8px 16px;
  height: 48px;

  &:hover {
    background-color: hsl(212deg, 33%, 40%);
  }

  &:focus {
    outline: 2px dotted hsl(212deg, 33%, 40%);
  }
`;

export default Button;
