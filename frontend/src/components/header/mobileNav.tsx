import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { siteLinks } from "constants/siteLinks";
import { NavLink } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const MobileNav = ({ isOpen, onDismiss }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Backdrop open={isOpen} onClick={onDismiss} />
        <Overlay>
          <Content>
            <Dialog.Close asChild onClick={onDismiss}>
              <CloseButton>
                <Cross1Icon />
              </CloseButton>
            </Dialog.Close>
            <Filler />
            <Nav>
              {siteLinks
                .filter(({ menu }) => menu)
                .map(({ name, path }) => (
                  <SiteLink key={name} to={path} onClick={onDismiss}>
                    {name}
                  </SiteLink>
                ))}
            </Nav>
            <Filler />
          </Content>
        </Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-gray-800);
  pointer-events: ${(props) => (props.open ? "auto" : "none")};

  ${({ open }) =>
    open
      ? css`
          animation: ${fadeIn} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
          animation-delay: 200ms;
        `
      : css`
          animation: ${fadeOut} 250ms ease-in;
        `}
`;

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 80%;
  display: flex;
  justify-content: flex-end;

  @media (prefers-reduced-motion: no-preference) {
    &[data-state="open"] {
      animation: ${slideIn} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
      animation-delay: 200ms;
    }
    &[data-state="closed"] {
      animation: ${slideOut} 250ms ease-in;
    }
  }
`;

const Content = styled(Dialog.Content)`
  background: white;
  width: 100%;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;

  @media (prefers-reduced-motion: no-preference) {
    &[data-state="open"] {
      animation: ${slideIn} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
      animation-delay: 200ms;
    }
    &[data-state="closed"] {
      animation: ${slideOut} 250ms ease-in;
    }
  }
`;

const CloseButton = styled.button`
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
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SiteLink = styled(NavLink)`
  color: black;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &.active {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;

export default MobileNav;
