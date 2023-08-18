import { Button } from "@components/Controls";
import { PostDetails } from "@components/Posts";
import {
  useApprovePostAdminMutation,
  useRejectPostAdminMutation,
} from "@services/api";
import { useNavigate, useParams } from "react-router-dom";

export const AdminPostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [approvePostApi, { isSuccess: isApproveSuccess, error: approveError }] =
    useApprovePostAdminMutation();

  const [rejectPostApi, { isSuccess: isRejectSuccess, error: rejectError }] =
    useRejectPostAdminMutation();

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

  const handleApproveClick = () => {
    approvePostApi({ postId: id });
  };

  const handleRejectClick = () => {
    alert("coming soon");
    // rejectPostApi({ postId: id });
  };

  return (
    <>
      <PostDetails id={id} onError={handleError} hideEditDelete={true} />
      <Button intent="primary" onClick={handleApproveClick}>
        Approve
      </Button>
      <Button intent="danger" onClick={handleRejectClick}>
        Reject
      </Button>
    </>
  );
};

export default AdminPostDetailsPage;
