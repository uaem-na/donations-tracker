import styled from "styled-components";

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.backgroundColor || "var(--color-primary)"};
  color: ${(props) => props.color || "var(--color-gray-1000)"};
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.25rem;
  margin-top: 8px;
  padding: 8px 16px;
  height: 48px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }

  &:focus {
    outline: 2px dotted hsl(212deg, 33%, 40%);
  }
`;

export default Button;
