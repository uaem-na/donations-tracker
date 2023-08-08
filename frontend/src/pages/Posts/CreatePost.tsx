import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreatePostForm } from "./components/CreatePostForm";

export const CreatePostPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [postType, setPostType] = useState<"offer" | "request">("offer");

  useEffect(() => {
    if (type !== "offer" && type !== "request") {
      navigate("/errors/404");
    } else {
      setPostType(type);
    }
  }, [type]);

  return (
    <>
      <CreatePostForm type={postType} />
    </>
  );
};
