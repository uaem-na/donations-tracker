import { useState } from "react";

import { useTranslation } from "react-i18next";

import {
  FilterPostType,
  FilterUserType,
  getPerPageOption,
  PerPageOption,
  PostsContainer,
} from "@components/Posts";
import { useGetPostsAdminQuery } from "@services/api";

export const AdminPostsPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPageOption>(10);

  // default filter should be "all" otherwise 400 error will be returned
  const [postType, setPostType] = useState<FilterPostType>("all");
  const [userType, setUserType] = useState<FilterUserType>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [date, setDate] = useState<Date>();
  const { data: postsResponse, isLoading } = useGetPostsAdminQuery(
    {
      per_page: perPage,
      page: page,
      post_type: postType,
      user_type: userType,
      price_range: priceRange,
      categories: categories,
      ...(date && { date: date.toISOString().substring(0, 10) }),
    },
    {
      refetchOnMountOrArgChange: 30,
    }
  );

  return (
    <>
      <div className="px-4 py-5">
        <PostsContainer
          heading={t("posts.title")}
          isLoading={isLoading}
          posts={postsResponse?.data}
          page={postsResponse?.page ?? 0}
          perPage={getPerPageOption(postsResponse?.per_page ?? 10)}
          total={postsResponse?.total ?? 0}
          updatePage={setPage}
          updatePerPage={setPerPage}
          updatePostType={setPostType}
          updateUserType={setUserType}
          updatePriceRange={setPriceRange}
          updateCategories={setCategories}
          updateDate={setDate}
          filters={{
            postType: true,
            userType: true,
            categories: true,
            pricing: true,
            date: true,
          }}
        />
      </div>
    </>
  );
};

export default AdminPostsPage;
