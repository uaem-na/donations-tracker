import { useGetSessionQuery } from "@store/services/api";
export const useRole = () => {
  const { status } = useGetSessionQuery();
  return status;
};
