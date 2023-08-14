import { PostsContainer } from "@components/Posts/PostsContainer";
import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { useGetSessionQuery, useGetStarredPostsQuery } from "@services/api";
import { useState } from "react";

export const DashboardPage = () => {
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

  return (
    <AccountLayout>
      <PostsContainer
        isLoading={isSessionLoading || isPostsLoading}
        posts={postsResponse?.data}
        page={postsResponse?.page ?? 0}
        perPage={postsResponse?.per_page ?? 0}
        total={postsResponse?.total ?? 0}
        updatePage={setPage}
        updatePerPage={setPerPage}
        updateTab={setPostsType}
      />
    </AccountLayout>
  );
};
