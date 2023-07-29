import { PostType } from "@constants";
import { useGetPostQuery } from "@store/services/posts";
import { useEffect } from "react";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostDetailsProps {
  id: string;
  type: Type;
  onError: (err) => void;
}

export const PostDetails = ({ id, type, onError }: PostDetailsProps) => {
  const {
    data: post,
    isLoading,
    isError,
    error: postError,
  } = useGetPostQuery({ postId: id });

  useEffect(() => {
    if (isError) {
      onError(postError);
    }
  }, [isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // display post and its properties and add labels for each property
  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.status}</p>
      <p>{post?.createdAt}</p>
      <p>{post?.updatedAt}</p>
      <p>{post?.type}</p>
      <div>
        <p>Items</p>
        {post?.items?.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
