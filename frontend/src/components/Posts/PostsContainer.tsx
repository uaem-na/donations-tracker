import { Button } from "@components/Controls";
import { SelectInput } from "@components/Controls/Select";
import { PostList } from "@components/Posts";
import { PostApiResponse } from "@services/api";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Tab = "all" | "request" | "offer";

interface PostsContainerProps {
  posts?: PostApiResponse[];
  page: number;
  perPage: number;
  total: number;
  onPerPageChange: (perPage: number) => void;
  onTabChange: (tab: Tab) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const PostsContainer = ({
  posts,
  page,
  perPage,
  total,
  onPerPageChange,
  onTabChange,
  onPrevPage,
  onNextPage,
}: PostsContainerProps) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<Tab>("all");

  useEffect(() => {
    if (onTabChange) {
      onTabChange(selectedTab);
    }
  }, [selectedTab]);

  const handlePerPageChange = (val: string) => {
    onPerPageChange(parseInt(val) ?? 10);
  };

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  const activeLinkClassName = "bg-purple-100 text-purple-800";
  const inactiveLinkClassName =
    "text-gray-500 hover:text-gray-700 hover:bg-gray-50";
  const linkClassName = (tab: Tab) =>
    tab === selectedTab ? activeLinkClassName : inactiveLinkClassName;

  const renderPaginationResults = useCallback(() => {
    return (
      <>
        <p className="flex gap-1 text-sm text-gray-700">
          Showing
          <span className="font-medium">
            {page === 1 ? 1 : page * perPage - (perPage - 1)}
          </span>
          to
          <span className="font-medium">
            {page * perPage > total ? total : page * perPage}
          </span>
          of
          <span className="font-medium">{total}</span>
          results
        </p>
      </>
    );
  }, [page, posts]);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              {t("select_a_tab")}
            </label>
            <select
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue={t("posts.all")}
              onChange={(e) => handleTabChange(e.target.value as Tab)}
            >
              <option value="all">{t("posts.all")}</option>
              <option value="request">{t("posts.requests")}</option>
              <option value="offer">{t("posts.offers")}</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              <a
                href="#"
                className={
                  "rounded-md px-3 py-2 text-sm font-medium " +
                  linkClassName("all")
                }
                onClick={() => handleTabChange("all" as const)}
              >
                {t("posts.all")}
              </a>
              <a
                href="#"
                className={
                  "rounded-md px-3 py-2 text-sm font-medium " +
                  linkClassName("request")
                }
                onClick={() => handleTabChange("request" as const)}
              >
                {t("posts.requests")}
              </a>
              <a
                href="#"
                className={
                  "rounded-md px-3 py-2 text-sm font-medium " +
                  linkClassName("offer")
                }
                onClick={() => handleTabChange("offer" as const)}
              >
                {t("posts.offers")}
              </a>
            </nav>
          </div>
        </div>

        <div className="sm:inline-flex sm:justify-end">
          <label htmlFor="perPage" className="sr-only">
            {t("display_per_page")}
          </label>
          <SelectInput
            name="perPage"
            className="w-full"
            defaultValue={10}
            onChange={(e) => handlePerPageChange(e.target.value)}
            placeholder={t("display_per_page")}
            options={["10", "25", "50"].map((i) => ({ value: i, label: i }))}
          ></SelectInput>
        </div>

        <PostList posts={posts} />

        <nav
          className="flex items-center justify-between px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">{renderPaginationResults()}</div>
          <div className="flex flex-1 justify-between sm:justify-end gap-2">
            <Button type="button" onClick={onPrevPage} disabled={page <= 1}>
              Previous
            </Button>
            <div className="block sm:hidden">{renderPaginationResults()}</div>
            <Button
              type="button"
              onClick={onNextPage}
              disabled={perPage * page > total}
            >
              Next
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};
