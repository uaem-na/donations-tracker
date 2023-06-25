import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetSessionQuery } from "../../app/services/auth";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { data, isLoading } = useGetSessionQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};
