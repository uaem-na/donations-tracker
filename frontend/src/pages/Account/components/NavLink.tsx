import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface INavItemProps {
  to: string;
  name: string;
  icon: IconDefinition;
}

export const NavItem = ({ to, name, icon }: INavItemProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        setIsActive(isActive);
        return `group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold ${
          isActive
            ? "bg-gray-50 text-purple-700"
            : "text-gray-500 hover:text-purple-800 hover:bg-gray-50"
        }`;
      }}
    >
      <FontAwesomeIcon
        className={`h-6 w-6 shrink-0 ${
          isActive
            ? "text-purple-800"
            : "text-gray-400 group-hover:text-purple-800"
        }`}
        icon={icon}
      />
      {name}
    </NavLink>
  );
};
