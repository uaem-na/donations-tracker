import { useGetSessionQuery } from "@store/services/api";
export const useRole = () => {
  const { data: session } = useGetSessionQuery();
  if (session) return session.role;
};
