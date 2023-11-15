import { SetStateAction, useCallback } from "react";

import { Trans, useTranslation } from "react-i18next";

import { Button } from "@components/Controls";
import { PostList } from "@components/Posts";
import { FilterLayout } from "@components/Posts/FilterLayout";
import { ApiModel, useGetItemCategoriesQuery } from "@services/api";

import {
  FilterPostType,
  FilterUserType,
  getPerPageOption,
  PerPageOption,
} from "./types";

interface FilterProps {
  userType: "individual" | "organization";
  date?: string; // date picker preferred, but text input is fine for first iteration
  category?: string[]; // multi-select checkbox preferred, but single select dropdown is fine for first iteration
}

interface PostsContainerProps {
  heading: string;
  posts?: ApiModel.Post[];
  page: number;
  perPage: PerPageOption;
  total: number;
  isLoading: boolean;
  updatePage: (setter: SetStateAction<number>) => void;
  updatePerPage: (setter: SetStateAction<PerPageOption>) => void;
  updatePostType: (setter: SetStateAction<FilterPostType>) => void;
  updateUserType: (setter: SetStateAction<FilterUserType>) => void;
  updateCategories: (setter: SetStateAction<string[]>) => void;
  updateDate?: (setter: SetStateAction<Date | undefined>) => void;
  filters: {
    postType: boolean;
    userType: boolean;
    categories: boolean;
    pricing: boolean;
    date?: boolean;
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
  updateDate,
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

  // display posts after a selected date
  const handleDateFilterChange = (date: Date) => {
    if (filters.date && updateDate !== undefined) {
      // update parent container state
      updatePage(1);
      updateDate(date);
    }
  };

  const renderPaginationResults = useCallback(() => {
    const from = total === 0 ? 0 : page * perPage - (perPage - 1);
    const to = page * perPage > total ? total : page * perPage;
    return (
      <>
        <p className="flex gap-1 text-sm text-gray-700">
          <Trans
            i18nKey="showing_results"
            values={{
              from: from,
              to: to,
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
      handleDateFilterChange={(value) => handleDateFilterChange(value)}
    >
      <div className="flex flex-col gap-y-4">
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
              disabled={perPage * page >= total}
            >
              {t("next")}
            </Button>
          </div>
        </nav>
      </div>
    </FilterLayout>
  );
};
