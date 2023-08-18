import { UserDetails } from "@components/Users";
import { useNavigate, useParams } from "react-router-dom";

export const AdminUserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate("/errors/404");
    return;
  }

  const handleError = (err) => {
    if (err.status === 404) {
      navigate("/errors/404");
    } else if (err.status === 500) {
      navigate("/errors/500");
    }
  };

  return (
    <>
      <UserDetails id={id} onError={handleError} />
    </>
  );
};
