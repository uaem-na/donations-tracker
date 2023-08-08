import { PostsContainer } from "@components/Posts/PostsContainer";
import { useGetPostsQuery } from "@services/api";
import { useTranslation } from "react-i18next";

export const PostsPage = () => {
  const { t } = useTranslation();
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <>
      <div className="px-4 py-5">
        <PostsContainer posts={posts} />
      </div>
    </>
  );
};
