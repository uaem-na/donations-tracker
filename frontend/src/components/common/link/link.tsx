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
      className={`px-2 py-1 text-gray-500 hover:text-gray-900 ${className} rounded-md outline-black outline-offset-4 hover:outline-2 hover:outline-dashed`}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
