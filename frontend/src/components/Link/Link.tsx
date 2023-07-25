import { FC } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface LinkProps extends RouterLinkProps {
  className?: string;
}

export const Link: FC<LinkProps> = ({ className, children, ...rest }) => {
  return (
    <RouterLink
      {...rest}
      className={`text-gray-500 hover:text-gray-900 ${className} rounded-sm outline-black focus:outline-1 focus:outline-dashed`}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
