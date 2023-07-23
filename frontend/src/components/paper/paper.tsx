import styled from "styled-components";
import { ELEVATIONS } from "../../constants";

const handleElevation = (elevation) => {
  switch (elevation) {
    case "low":
      return ELEVATIONS.small;
    case "medium":
      return ELEVATIONS.medium;
    case "high":
      return ELEVATIONS.large;
    default:
      return ELEVATIONS.medium;
  }
};

const Paper = styled.div`
  padding: 32px;
  box-shadow: ${({ elevation }) => handleElevation(elevation)};
  border-radius: 8px;
  background-color: hsl(212deg, 33%, 95%);
`;

export default Paper;
