import {
  FilterPostType,
  FilterUserType,
  getPerPageOption,
  PerPageOption,
  PostsContainer,
} from "@components";
import { useGetSessionQuery, useGetStarredPostsQuery } from "@services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const MyPosts = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPageOption>(10);

  // default filter should be "all" otherwise 400 error will be returned
  const [postType, setPostType] = useState<FilterPostType>("all");
  const [userType, setUserType] = useState<FilterUserType>("all");
  const [categories, setCategories] = useState<string[]>(["all"]);

  const { data: user, isLoading: isSessionLoading } = useGetSessionQuery();
  const { data: postsResponse, isLoading: isPostsLoading } =
    useGetStarredPostsQuery({
      userId: user?.id!,
      per_page: perPage,
      page: page,
      post_type: postType,
      user_type: userType,
      categories: categories,
    });

  return (
    <PostsContainer
      heading={t("posts.my_posts")}
      isLoading={isSessionLoading || isPostsLoading}
      posts={postsResponse?.data}
      page={postsResponse?.page ?? 0}
      perPage={getPerPageOption(postsResponse?.per_page ?? 10)}
      total={postsResponse?.total ?? 0}
      updatePage={setPage}
      updatePerPage={setPerPage}
      updatePostType={setPostType}
      updateUserType={setUserType}
      updateCategories={setCategories}
    />
  );
};
