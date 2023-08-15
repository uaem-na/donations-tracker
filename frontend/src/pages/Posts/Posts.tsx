import {
  FilterPostType,
  FilterUserType,
  PerPageOption,
  PostsContainer,
  getPerPageOption,
} from "@components/Posts";
import { useGetPostsQuery } from "@services/api";
import { useState } from "react";

export const PostsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPageOption>(10);
  const [postType, setPostType] = useState<FilterPostType>("all");
  const [userType, setUserType] = useState<FilterUserType>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const { data: postsResponse, isLoading } = useGetPostsQuery({
    per_page: perPage,
    page: page,
    post_type: postType,
    user_type: userType,
    categories: categories,
  });

  return (
    <>
      <div className="px-4 py-5">
        <PostsContainer
          isLoading={isLoading}
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
      </div>
    </>
  );
};
