import styled from "styled-components";

const ExternalLink = ({ children, ...rest }) => {
  return (
    <StyledLink {...rest} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledLink>
  );
};

const StyledLink = styled.a`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;

  color: var(--color-secondary);

  text-decoration: underline 1px dotted var(--color-secondary);
  text-underline-offset: 0.2em;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline 1px dotted var(--color-primary);
  }
`;

export default ExternalLink;
