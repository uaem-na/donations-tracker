import { PostType } from "@constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreatePostForm } from "./components/CreatePostForm";

export const CreatePostPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [postType, setPostType] = useState<
    (typeof PostType)[keyof typeof PostType]
  >(PostType.OFFER);

  useEffect(() => {
    if (type !== PostType.OFFER && type !== PostType.REQUEST) {
      navigate("/errors/404");
    } else {
      setPostType(type);
    }
  }, [type]);

  return (
    <div className="p-6">
      <CreatePostForm type={postType} />
    </div>
  );
};
