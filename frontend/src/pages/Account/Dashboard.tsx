import { PostsContainer } from "@components/Posts/PostsContainer";
import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { useGetSessionQuery, useGetStarredPostsQuery } from "@services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const DashboardPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [postsType, setPostsType] = useState<"all" | "request" | "offer">(
    "all"
  );
  const { data: user, isLoading: isSessionLoading } = useGetSessionQuery();
  const { data: postsResponse, isLoading: isPostsLoading } =
    useGetStarredPostsQuery({
      userId: user?.id!,
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

  if (isSessionLoading || isPostsLoading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <AccountLayout>
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
    </AccountLayout>
  );
};
