import { useNavigate, useParams } from "react-router-dom";
import { PostDetails } from "./components/PostDetails";

export const OfferDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    // TODO: create 404 page and navigate to it
    navigate("/");
    return;
  }

  return (
    <>
      <PostDetails id={id} type="offer" />
    </>
  );
};
