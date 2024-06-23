import { Tooltip } from "@components/Controls";
import { ISiteLinks, UserRole } from "@constants";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetSessionQuery } from "@services/api";
import { generateRandomID } from "@utils";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
interface SidebarLogoProps {
  name: string;
}

const SidebarLogo = ({ name }: SidebarLogoProps) => {
  return (
    <div className="flex h-16 shrink-0 items-center justify-center">
      <div className="h-8 w-auto text-gray-100 font-light">{name}</div>
    </div>
  );
};

interface NavListProps {
  siteLinks: ISiteLinks[];
  isUserAdmin?: boolean;
}

const NavList = ({ siteLinks, isUserAdmin = false }: NavListProps) => {
  return (
    <nav className="mt-4">
      <ul className="flex flex-col items-center space-y-1">
        {siteLinks
          .filter(({ menu, adminOnly }) => menu && (!adminOnly || isUserAdmin))
          .map(({ name, path, icon }) => (
            <NavItem
              key={name + generateRandomID()}
              to={path}
              name={name}
              icon={icon}
            ></NavItem>
          ))}
      </ul>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  name: string;
  icon?: IconDefinition;
}

// TODO: Add active class to nav item
const NavItem = ({ to, name, icon }: NavItemProps) => {
  return (
    <li>
      <Tooltip message={name} side="right" delayDuration={0}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold  ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
          tabIndex={-1}
        >
          {icon && <FontAwesomeIcon icon={icon} className="h-6 w-6 shrink-0" />}
          <span className="sr-only">{name}</span>
        </NavLink>
      </Tooltip>
    </li>
  );
};

interface ISidebarProps {
  name: string;
  siteLinks: ISiteLinks[];
}

export const Sidebar = ({ name, siteLinks }: ISidebarProps) => {
  const { data: session, isLoading } = useGetSessionQuery();
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="hidden">{t("loading")}</div>;
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
      <SidebarLogo name={name} />
      <div className="mt-6">
        <LanguageToggle isMobile={false}/>
        <NavList
          siteLinks={siteLinks}
          isUserAdmin={session?.role?.includes(UserRole.ADMIN)}
        />
      </div>
    </div>
  );
};
