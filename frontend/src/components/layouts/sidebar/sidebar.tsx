import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { ISiteLinks } from "../../../constants/siteLinks";

const SidebarLogo = ({ name }) => {
  return (
    <div className="flex h-16 shrink-0 items-center justify-center">
      <div className="h-8 w-auto text-gray-100 font-light">{name}</div>
    </div>
  );
};

const NavList = ({ siteLinks }) => {
  return (
    <nav className="mt-8">
      <ul className="flex flex-col items-center space-y-1">
        {siteLinks
          .filter(({ menu }) => menu)
          .map(({ name, path, icon }) => (
            <NavItem key={name} to={path} name={name} icon={icon}></NavItem>
          ))}
      </ul>
    </nav>
  );
};

const NavItem = ({ to, name, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold  ${
            isActive
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`
        }
      >
        <FontAwesomeIcon icon={icon} className="h-6 w-6 shrink-0" />
        <span className="sr-only">{name}</span>
      </NavLink>
    </li>
  );
};

interface ISidebarProps {
  name: string;
  siteLinks: ISiteLinks[];
}

export const Sidebar = ({ name, siteLinks }: ISidebarProps) => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
      <SidebarLogo name={name} />
      <NavList siteLinks={siteLinks} />
    </div>
  );
};
