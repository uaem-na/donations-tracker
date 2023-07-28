import { PostType } from "@constants";
import { useGetPostQuery } from "@store/services/posts";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostDetailsProps {
  id: string;
  type: Type;
}

export const PostDetails = ({ id, type }: PostDetailsProps) => {
  const { data: post, isLoading, isError } = useGetPostQuery({ postId: id });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  console.log(post);

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
