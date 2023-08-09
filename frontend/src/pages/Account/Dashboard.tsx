import { PostsContainer } from "@components/Posts/PostsContainer";
import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { useGetSessionQuery, useGetStarredPostsQuery } from "@services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const DashboardPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [postsType, setPostsType] = useState<"all" | "request" | "offer">(
    "all"
  );
  const { data: user, isLoading: isSessionLoading } = useGetSessionQuery();
  const { data: posts, isLoading: isPostsLoading } = useGetStarredPostsQuery({
    userId: user?.id!,
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

  if (isSessionLoading || isPostsLoading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <AccountLayout>
      <PostsContainer
        posts={posts}
        onTabChange={handleTabChange}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </AccountLayout>
  );
};
