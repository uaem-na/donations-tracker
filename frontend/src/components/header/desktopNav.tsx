import { QUERIES } from "@constants";
import { siteLinks } from "constants/siteLinks";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const DesktopNav = () => {
  return (
    <Wrapper>
      {siteLinks
        .filter(({ menu }) => menu)
        .map(({ name, path }) => (
          <SiteLink key={name} to={path}>
            {name}
          </SiteLink>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem);
  margin: 0px clamp(24px, 9.2vw - 4.5rem, 3.5rem);
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const SiteLink = styled(NavLink)`
  color: black;
  font-size: 1rem;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;

  &.active {
    color: var(--color-secondary);
  }
`;

export default DesktopNav;
