import { PostsContainer } from "@components/Posts/PostsContainer";
import { useGetPostsQuery } from "@services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const PostsPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [postsType, setPostsType] = useState<"all" | "request" | "offer">(
    "all"
  );
  const { data: posts, isLoading } = useGetPostsQuery({
    per_page: 10,
    page: page,
    type: postsType,
  });

  const handleTabChange = (tab: "all" | "request" | "offer") => {
    setPostsType(tab);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <>
      <div className="px-4 py-5">
        <PostsContainer
          posts={posts}
          onTabChange={handleTabChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </>
  );
};
