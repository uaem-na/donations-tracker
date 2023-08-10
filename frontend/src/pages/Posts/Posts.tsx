import { PostsContainer } from "@components/Posts/PostsContainer";
import { useGetPostsQuery } from "@services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const PostsPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // TODO: add per page selector
  const [postsType, setPostsType] = useState<"all" | "request" | "offer">(
    "all"
  );
  const { data: postsResponse, isLoading } = useGetPostsQuery({
    per_page: perPage,
    page: page,
    type: postsType,
  });

  const handlePerPageChange = (perPage: number) => {
    setPage(1);
    setPerPage(perPage);
  };

  const handleTabChange = (tab: "all" | "request" | "offer") => {
    setPage(1);
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
          posts={postsResponse?.data}
          page={postsResponse?.page ?? 0}
          perPage={postsResponse?.per_page ?? 0}
          total={postsResponse?.total ?? 0}
          onPerPageChange={handlePerPageChange}
          onTabChange={handleTabChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </>
  );
};
