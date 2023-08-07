import { PostList } from "@components";
import { PostType } from "@constants";
import { useGetPostsQuery } from "@services/posts";
import { useTranslation } from "react-i18next";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostTableProps {
  type: Type;
}

// TODO: add pagination, sorting, filtering
export const PostTable = ({ type }: PostTableProps) => {
  const { t } = useTranslation();
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div className="flex flex-col">
      <PostList posts={posts?.filter((post) => post.type === type)} />
    </div>
  );
};
