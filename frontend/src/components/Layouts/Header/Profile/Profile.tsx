import { Avatar } from "@components";
import { useToast } from "@components/Toast";
import { UserRole } from "@constants";
import { faHandshake, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useGetSessionQuery, useLogoutMutation } from "@services/api";
import { classMerge } from "@utils";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileMenu = () => {
  const { data: user } = useGetSessionQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  const toast = useToast();

  const disableMakingPosts =
    !user?.isEmailVerified ||
    (user?.role === UserRole.ORGANIZATION && !user?.organization?.verified);
  const allowMakingRequest =
    user?.role === UserRole.ORGANIZATION || user?.role === UserRole.ADMIN;

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
              <span className="sr-only">
                {t("user_actions.open_user_menu")}
              </span>
              <Avatar alt={user.firstName} size={"h-10 w-10"} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="z-10 mt-2.5 min-w-[200px] origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <DropdownMenu.Group>
                <DropdownMenu.Item
                  className="block px-3 py-1 text-sm leading-6 font-light text-gray-900 cursor-pointer hover:bg-gray-50"
                  onSelect={() => {
                    navigate("/account/dashboard");
                  }}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2 w-[20px]" />
                  {t("user_actions.your_account")}
                </DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Separator className="h-px bg-gray-900/10 m-0.5" />
              <DropdownMenu.Group>
                <DropdownMenu.Item
                  onSelect={() => {
                    if (!user.isEmailVerified) {
                      toast.open({
                        content: t("errors.posts.email_not_verified"),
                        type: "error",
                      });
                    } else if (
                      user.role === UserRole.ORGANIZATION &&
                      !user.organization?.verified
                    ) {
                      toast.open({
                        content: t("errors.posts.organization_not_verified"),
                        type: "error",
                      });
                    } else {
                      navigate("/posts/offer/new");
                    }
                  }}
                  className={classMerge(
                    "block px-3 py-1 text-sm leading-6 font-light text-gray-900 cursor-pointer hover:bg-gray-50",
                    {
                      "text-gray-700 cursor-not-allowed opacity-50":
                        disableMakingPosts,
                    },
                  )}
                >
                  <FontAwesomeIcon
                    icon={faHandshake}
                    className="mr-2 w-[20px]"
                  />
                  {t("user_actions.make_offer")}
                </DropdownMenu.Item>
                {allowMakingRequest && (
                  <DropdownMenu.Item
                    onSelect={() => {
                      if (!user.isEmailVerified) {
                        toast.open({
                          content: t("errors.posts.email_not_verified"),
                          type: "error",
                        });
                      } else if (
                        user.role === UserRole.ORGANIZATION &&
                        !user.organization?.verified
                      ) {
                        toast.open({
                          content: t("errors.posts.organization_not_verified"),
                          type: "error",
                        });
                      } else {
                        navigate("/posts/request/new");
                      }
                    }}
                    className={classMerge(
                      "block px-3 py-1 text-sm leading-6 font-light text-gray-900 cursor-pointer hover:bg-gray-50",
                      {
                        "text-gray-700 cursor-not-allowed opacity-50":
                          disableMakingPosts,
                      },
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faFileSignature}
                      className="mr-2 w-[20px]"
                    />
                    {t("user_actions.make_request")}
                  </DropdownMenu.Item>
                )}
              </DropdownMenu.Group>
              <DropdownMenu.Separator className="h-px bg-gray-900/10 m-0.5" />
              <DropdownMenu.Item
                onSelect={() => logout()}
                className="block px-3 py-1 text-sm leading-6 font-light text-gray-900 cursor-pointer hover:bg-gray-50"
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="mr-2 w-[20px]"
                />
                {t("user_actions.logout")}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <LoginLink to="/login">{t("user_actions.login")}</LoginLink>
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
