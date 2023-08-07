import { PostApiResponse } from "@store/services/posts";
import { PostItem } from "./PostItem";

interface PostListProps {
  posts: PostApiResponse[] | undefined;
}

export const PostList = ({ posts }: PostListProps) => {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
    >
      {posts?.map((post: PostApiResponse) => {
        return (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.item.name}
            status={post.status}
            displayName={post.author.firstName + " " + post.author.lastName}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
          />
        );
      })}
    </ul>
  );
};
