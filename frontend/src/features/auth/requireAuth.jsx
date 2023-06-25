import { Navigate, useLocation } from "react-router-dom";
import { useGetSessionQuery } from "../../app/services/auth";

export const RequireAuth = ({ children }) => {
  const { pathname } = useLocation();
  const { data: session, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    // session doesn't exist, redirect to login
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  // session exists, check pathname to see if already on login page
  if (pathname === "/login") {
    return <Navigate to="/account" />;
  }

  // render the children
  return <>{children}</>;
};
