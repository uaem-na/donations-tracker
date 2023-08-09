import { PostsContainer } from "@components/Posts/PostsContainer";
import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { useGetSessionQuery, useGetStarredPostsQuery } from "@services/api";
import { useTranslation } from "react-i18next";

export const DashboardPage = () => {
  const { t } = useTranslation();
  const { data: user, isLoading: isSessionLoading } = useGetSessionQuery();
  const { data: posts, isLoading: isPostsLoading } = useGetStarredPostsQuery({
    userId: user?.id!,
  });

  if (isSessionLoading || isPostsLoading) {
    return <p>{t("loading")}</p>;
  }
  return (
    <AccountLayout>
      <PostsContainer posts={posts} />
    </AccountLayout>
  );
};
