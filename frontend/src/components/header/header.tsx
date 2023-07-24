import { QUERIES } from "@constants";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import styled from "styled-components";
import { DesktopNav } from "./desktopNav";
import MobileNav from "./mobileNav";
import { UserMenu } from "./userMenu";

export const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <header>
      <MainHeader>
        <MobileNavButtonWrapper>
          <MobileNavButton
            type="button"
            title="Open menu"
            onClick={() => setShowMobileNav(true)}
          >
            <MobileNavButtonIcon />
            <VisuallyHidden.Root>Open menu</VisuallyHidden.Root>
          </MobileNavButton>
        </MobileNavButtonWrapper>
        <LogoWrapper>UAEM | LOGO</LogoWrapper>
        <DesktopNav />
        <UserMenu />
        <MobileNav
          isOpen={showMobileNav}
          onDismiss={() => setShowMobileNav(false)}
        />
      </MainHeader>
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 32px;
  height: 64px;
  background-color: rgb(31 41 55);
  color: white;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-between;
  }
`;

const MobileNavButtonWrapper = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 32px;
    display: flex;
  }

  @media ${QUERIES.phoneAndSmaller} {
    gap: 16px;
  }
`;

const MobileNavButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const MobileNavButtonIcon = styled(HamburgerMenuIcon)`
  width: 28px;
  height: 28px;
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 150px;
  justify-content: center;
`;

export default Header;
