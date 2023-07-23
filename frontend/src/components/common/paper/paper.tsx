import { QUERIES } from "constants";
import { FC, HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevation?: string;
}

const handleElevation = (elevation: string) => {
  switch (elevation) {
    case "sm":
      return "shadow-sm";
    case "lg":
      return "shadow-lg";
    default:
      return "shadow-md";
  }
};

export const Paper: FC<PaperProps> = ({ children, elevation = "md" }) => {
  const shadowClassName = handleElevation(elevation);

  return (
    <Wrapper className={`${shadowClassName} p-4 rounded-md bg-white`}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media ${QUERIES.phoneAndSmaller} {
    width: clamp(300px, 80vw, 600px);
  }
  width: 600px;
  padding: 24px;
  border-radius: 20px;
`;

export default Paper;
