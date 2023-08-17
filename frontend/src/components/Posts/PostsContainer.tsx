import { Button } from "@components/Controls";
import { PostList } from "@components/Posts";
import { FilterLayout } from "@components/Posts/FilterLayout";
import { PostApiResponse, useGetItemCategoriesQuery } from "@services/api";
import { SetStateAction, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  FilterPostType,
  FilterUserType,
  PerPageOption,
  getPerPageOption,
} from "./types";

interface FilterProps {
  userType: "individual" | "organization";
  date?: string; // date picker preferred, but text input is fine for first iteration
  category?: string[]; // multi-select checkbox preferred, but single select dropdown is fine for first iteration
}

interface PostsContainerProps {
  heading: string;
  posts?: PostApiResponse[];
  page: number;
  perPage: PerPageOption;
  total: number;
  isLoading: boolean;
  updatePage: (setter: SetStateAction<number>) => void;
  updatePerPage: (setter: SetStateAction<PerPageOption>) => void;
  updatePostType: (setter: SetStateAction<FilterPostType>) => void;
  updateUserType: (setter: SetStateAction<FilterUserType>) => void;
  updateCategories: (setter: SetStateAction<string[]>) => void;
  filters: {
    postType: boolean;
    userType: boolean;
    categories: boolean;
  };
}

export const PostsContainer = ({
  heading,
  posts,
  page,
  perPage,
  total,
  isLoading,
  updatePage,
  updatePerPage,
  updatePostType,
  updateUserType,
  updateCategories,
  filters,
}: PostsContainerProps) => {
  const { t } = useTranslation();
  const { data: categories } = useGetItemCategoriesQuery({ locale: "en" });

  const handlePerPageChange = (val: string) => {
    // update parent container state
    updatePage(1);
    updatePerPage(getPerPageOption(parseInt(val)));
  };

  const handlePostTypeFilterChange = (postType: FilterPostType) => {
    // update parent container state
    updatePage(1);
    updatePostType(postType);
  };

  const handleUserTypeFilterChange = (userType: FilterUserType) => {
    // update parent container state
    updatePage(1);
    updateUserType(userType);
  };

  const handleCategoryFilterChange = (categories: string[]) => {
    // update parent container state
    updatePage(1);
    updateCategories(categories);
  };

  const renderPaginationResults = useCallback(() => {
    return (
      <>
        <p className="flex gap-1 text-sm text-gray-700">
          <Trans
            i18nKey="showing_results"
            values={{
              from:
                total === 0
                  ? 0
                  : page === 1
                  ? 1
                  : page * perPage - (perPage - 1),
              to: page * perPage > total ? total : page * perPage,
              total: total,
            }}
            components={{
              from: <span className="font-medium" />,
              to: <span className="font-medium" />,
              total: <span className="font-medium" />,
            }}
          />
        </p>
      </>
    );
  }, [page, posts]);

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <FilterLayout
      filters={filters}
      heading={heading}
      handlePerPageChange={(e) => handlePerPageChange(e)}
      handlePostTypeFilterChange={(option) =>
        handlePostTypeFilterChange(option)
      }
      handleUserTypeFilterChange={(option) =>
        handleUserTypeFilterChange(option)
      }
      categories={categories ?? []}
      handleCategoryFilterChange={(options) =>
        handleCategoryFilterChange(options.map((opt) => opt.value))
      }
    >
      <div className="flex flex-col gap-y-4">
        {/*<FilterContainer*/}
        {/*  name="postType"*/}
        {/*  multiSelect={false}*/}
        {/*  activeClassNames="bg-purple-100 text-purple-800"*/}
        {/*  inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"*/}
        {/*  ariaLabel={t("posts.select_type")}*/}
        {/*  options={[*/}
        {/*    { value: "request", label: t("posts.requests") },*/}
        {/*    { value: "offer", label: t("posts.offers") },*/}
        {/*  ]}*/}
        {/*  onChange={(option) =>*/}
        {/*    handlePostTypeFilterChange(option.value as FilterPostType)*/}
        {/*  }*/}
        {/*/>*/}
        {/*<FilterContainer*/}
        {/*  name="userType"*/}
        {/*  multiSelect={false}*/}
        {/*  activeClassNames="bg-purple-100 text-purple-800"*/}
        {/*  inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"*/}
        {/*  ariaLabel={t("posts.select_user_type")}*/}
        {/*  options={[*/}
        {/*    { value: "individual", label: t("users.individual") },*/}
        {/*    { value: "organization", label: t("users.organization") },*/}
        {/*  ]}*/}
        {/*  onChange={(option) =>*/}
        {/*    handleUserTypeFilterChange(option.value as FilterUserType)*/}
        {/*  }*/}
        {/*/>*/}
        {/*<FilterContainer*/}
        {/*  name="category"*/}
        {/*  multiSelect={true}*/}
        {/*  activeClassNames="bg-purple-100 text-purple-800"*/}
        {/*  inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"*/}
        {/*  ariaLabel={t("posts.select_category")}*/}
        {/*  options={categories ?? []}*/}
        {/*  onChange={(options) =>*/}
        {/*    handleCategoryFilterChange(options.map((option) => option.value))*/}
        {/*  }*/}
        {/*/>*/}

        {/*<div className="sm:inline-flex sm:justify-end">*/}
        {/*  <label htmlFor="perPage" className="sr-only">*/}
        {/*    {t("display_per_page")}*/}
        {/*  </label>*/}
        {/*  <SelectInput*/}
        {/*    name="perPage"*/}
        {/*    className="w-full"*/}
        {/*    defaultValue={10}*/}
        {/*    onChange={(e) => handlePerPageChange(e.target.value)}*/}
        {/*    placeholder={t("display_per_page")}*/}
        {/*    options={["10", "20", "50", "100"].map((i) => ({*/}
        {/*      value: i,*/}
        {/*      label: i,*/}
        {/*    }))}*/}
        {/*  ></SelectInput>*/}
        {/*</div>*/}

        <PostList posts={posts} />

        <nav
          className="flex items-center justify-between px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">{renderPaginationResults()}</div>
          <div className="flex flex-1 justify-between sm:justify-end gap-2">
            <Button
              type="button"
              onClick={() => updatePage((prev) => Math.max(prev - 1, 1))}
              disabled={page <= 1}
            >
              {t("previous")}
            </Button>
            <div className="block sm:hidden">{renderPaginationResults()}</div>
            <Button
              type="button"
              onClick={() => updatePage((prev) => prev + 1)}
              disabled={perPage * page > total}
            >
              {t("next")}
            </Button>
          </div>
        </nav>
      </div>
    </FilterLayout>
  );
};
