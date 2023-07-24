import { Avatar } from "@components/common";
import { faHandshake, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useGetSessionQuery, useLogoutMutation } from "@services/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileMenu = () => {
  const { data: user } = useGetSessionQuery({});
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <Avatar alt={user.firstName} size={"h-10 w-10"} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="z-10 mt-2.5 min-w-[200px] origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <DropdownMenu.Group>
                <DropdownMenu.Item
                  className="block px-3 py-1 text-sm leading-6 font-light text-gray-900 cursor-pointer hover:bg-gray-50"
                  onSelect={() => {
                    navigate("/account");
                  }}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2 w-[20px]" />
                  Your account
                </DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Separator className="h-px bg-gray-900/10 m-0.5" />
              <DropdownMenu.Group>
                <DropdownMenu.Item className="block px-3 py-1 text-sm leading-6 font-light text-gray-900 cursor-pointer hover:bg-gray-50">
                  <FontAwesomeIcon
                    icon={faHandshake}
                    className="mr-2 w-[20px]"
                  />
                  Make offer
                </DropdownMenu.Item>
                <DropdownMenu.Item className="block px-3 py-1 text-sm leading-6 font-light text-gray-900 cursor-pointer hover:bg-gray-50">
                  <FontAwesomeIcon
                    icon={faFileSignature}
                    className="mr-2 w-[20px]"
                  />
                  Make request
                </DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Separator className="h-px bg-gray-900/10 m-0.5" />
              <DropdownMenu.Item
                onSelect={() => logout({})}
                className="block px-3 py-1 text-sm leading-6 font-light text-gray-900 cursor-pointer hover:bg-gray-50"
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="mr-2 w-[20px]"
                />
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
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

export const Profile = () => {
  return (
    <div className="relative">
      <ProfileMenu />
    </div>
  );
};
