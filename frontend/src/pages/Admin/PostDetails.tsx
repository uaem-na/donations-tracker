import { Button } from "@components/Controls";
import { PostDetails, PostItem } from "@components/Posts";
import {
  faCircleXmark,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useApprovePostAdminMutation,
  useRejectPostAdminMutation,
  useGetPostQuery, // added
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

  const { data: postData, error: postError } = useGetPostQuery(id); // TODO: FIX THIS


  const handleError = (err) => {
    if (err.status === 404) {
      navigate("/errors/404");
    } else if (err.status === 500) {
      navigate("/errors/500");
    }
  };

  const handleApproveClick = () => {
    if (postData && postData.item.category === "Other") {
      approvePostApi({ postId: id });
    } else {
      approvePostApi({ postId: id });
    }
  };

  const handleRejectClick = () => {
    alert("coming soon");
    // rejectPostApi({ postId: id });
  };


  return (
    <div className="container mx-auto">
      <PostDetails id={id} onError={handleError} hideEditDelete={true} />
      <div className="mt-4 flex justify-end gap-2.5 px-4">
        <Button
          intent="primary"
          onClick={handleApproveClick}
          className="flex gap-1.5 justify-center items-center"
        >
          <FontAwesomeIcon icon={faClipboardCheck} />
          Approve
        </Button>
        <Button
          intent="danger"
          onClick={handleRejectClick}
          className="flex gap-1.5 justify-center items-center"
        >
          <FontAwesomeIcon icon={faCircleXmark} />
          Reject
        </Button>
      </div>
    </div>
  );
};

export default AdminPostDetailsPage;
