import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiModel } from "@services/api";
import { useTranslation } from "react-i18next";
import { PostItem } from "./PostItem";

interface PostListProps {
  posts: ApiModel.Post[] | undefined;
}

export const PostList = ({ posts }: PostListProps) => {

  const { t } = useTranslation();
  if (posts === undefined || posts.length === 0) {
    return (
      <>
        <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <FontAwesomeIcon
            className="mx-auto h-12 w-12 text-gray-400"
            icon={faRectangleList}
          />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            {t("posts.no_posts_found")}
          </span>
        </div>
      </>
    );
  }

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
    >
      {posts?.map((post: ApiModel.Post) => {
        return (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.item.name}
            status={post.status}
            displayName={post.author.displayName}
            category={post.item.category}
            price={post.item.price}
            quantity={post.item.quantity}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            type={post.type}
          />
        );
      })}
    </ul>
  );
};
