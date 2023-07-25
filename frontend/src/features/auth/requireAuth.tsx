import { useGetSessionQuery } from "@services/auth";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
  role?: string;
}

export const RequireAuth = ({ children, role }: RequireAuthProps) => {
  const { pathname } = useLocation();
  const { data: session, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    // session doesn't exist, redirect to login
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  // session exists, check if role prop is passed
  if (role) {
    // role prop is passed, check if user has role
    if (!session.role.includes(role)) {
      // user doesn't have role, redirect to account page
      return <Navigate to="/account" />;
    }
  }

  // session exists, check pathname to see if already on login page
  if (pathname === "/login") {
    return <Navigate to="/account" />;
  }

  // render the children
  return <>{children}</>;
};
