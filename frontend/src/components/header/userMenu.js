import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../auth";
import { UserAvatar } from "./userAvatar";

// define keyframes ahead of other styled components
const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// UserMenu requires authentication
export const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <>
      {user ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <MenuButton type="button" title="Menu button">
              <UserAvatar firstName={user.firstName} />
            </MenuButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenuContent>
              <DropdownMenuArrow />

              <DropdownMenu.Group>
                <DropdownMenuItem
                  onSelect={() => {
                    navigate("/account");
                  }}
                >
                  Your account
                </DropdownMenuItem>
              </DropdownMenu.Group>
              <DropdownMenuSeparator />
              <DropdownMenu.Group>
                <DropdownMenuItem onSelect={() => navigate("/new-offer")}>
                  Make offer
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate("/new-request")}>
                  Make request
                </DropdownMenuItem>
              </DropdownMenu.Group>
              <DropdownMenuSeparator />
              <DropdownMenu.Group>
                <DropdownMenuItem onSelect={() => logout()}>
                  <LogoutText>Logout</LogoutText>
                </DropdownMenuItem>
              </DropdownMenu.Group>
            </DropdownMenuContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <LoginLink to="/login">Login</LoginLink>
      )}
    </>
  );
};

const LoginLink = styled(Link)`
  color: inherit;
`;

const MenuButton = styled.button`
  font-family: inherit;
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0 2px 10px var(--color-gray-300);

  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

const DropdownMenuSeparator = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: var(--color-gray-800);
  margin: 5px;
`;

const DropdownMenuContent = styled(DropdownMenu.Content)`
  min-width: 200px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-side="top"] {
    animation-name: ${slideDownAndFade};
  }

  &[data-side="right"] {
    animation-name: ${slideLeftAndFade};
  }

  &[data-side="bottom"] {
    animation-name: ${slideUpAndFade};
  }

  &[data-side="left"] {
    animation-name: ${slideRightAndFade};
  }
`;

const DropdownMenuArrow = styled(DropdownMenu.Arrow)`
  fill: white;
`;

const DropdownMenuItem = styled(DropdownMenu.Item)`
  font-size: 16px;
  line-height: 1.2;
  color: var(--color-gray-300);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 32px;
  position: relative;
  padding-left: 12px;
  padding-right: 12px;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

const LogoutText = styled.span`
  color: red;
`;

export default UserMenu;
