import { PostsContainer } from "@components/Posts/PostsContainer";
import { useGetPostsQuery } from "@services/api";
import { useState } from "react";

export const PostsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [postsType, setPostsType] = useState<"all" | "request" | "offer">(
    "all"
  );
  const { data: postsResponse, isLoading } = useGetPostsQuery({
    per_page: perPage,
    page: page,
    type: postsType,
  });

  return (
    <>
      <div className="px-4 py-5">
        <PostsContainer
          isLoading={isLoading}
          posts={postsResponse?.data}
          page={postsResponse?.page ?? 0}
          perPage={postsResponse?.per_page ?? 0}
          total={postsResponse?.total ?? 0}
          updatePage={setPage}
          updatePerPage={setPerPage}
          updateTab={setPostsType}
        />
      </div>
    </>
  );
};
