import { useLocation } from "react-router-dom";

export const useCurrentPath = () => {
  const location = useLocation();
  return location.pathname;
};
