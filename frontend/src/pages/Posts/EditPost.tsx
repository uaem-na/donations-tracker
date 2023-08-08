import { useNavigate, useParams } from "react-router-dom";
import { EditPostForm } from "./components/EditPostForm";

export const EditPostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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
      <EditPostForm id={id} onError={handleError} />
    </>
  );
};
