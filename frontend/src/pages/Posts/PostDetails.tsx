import { PostDetails } from "@components/Posts/PostDetails";
import { useNavigate, useParams } from "react-router-dom";

export const PostDetailsPage = () => {
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
      <PostDetails id={id} onError={handleError} />
    </>
  );
};
