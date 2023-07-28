import { useGetSessionQuery } from "@services/auth";
import { useNavigate } from "react-router-dom";

export const OrganizationRegistrationForm = () => {
  const navigate = useNavigate();
  const { data: currentSession, isLoading } = useGetSessionQuery();

  return <></>;
};
