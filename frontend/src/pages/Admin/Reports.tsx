import { getPerPageOption, PerPageOption } from "@components";
import { Button } from "@components/Controls";
import { SelectInput } from "@components/Controls/Select";
import { ReportedPostItem } from "@pages/Admin/components/ReportedPostItem";
import { ApiModel, useGetReportedPostsQuery } from "@services/api";
import { useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

export const ReportsPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPageOption>(10);

  const { data: reportedPostsResponse, isLoading } = useGetReportedPostsQuery({
    per_page: perPage,
    page: page,
  });

  const handlePerPageChange = (val: string) => {
    // update parent container state
    setPage(1);
    setPerPage(getPerPageOption(parseInt(val)));
  };

  const renderPaginationResults = useCallback(() => {
    return (
      <>
        <p className="flex gap-1 text-sm text-gray-700">
          <Trans
            i18nKey="showing_results"
            values={{
              from:
                reportedPostsResponse?.total === 0
                  ? 0
                  : page === 1
                  ? 1
                  : page * perPage - (perPage - 1),
              to:
                page * perPage > reportedPostsResponse?.total!
                  ? reportedPostsResponse?.total
                  : page * perPage,
              total: reportedPostsResponse?.total,
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
  }, [page, reportedPostsResponse]);

  return (
    <div className="px-4 py-5">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          {t("reports.manage_reported_posts")}
        </h1>
      </div>

      <div className="flex items-center justify-end">
        <div className="relative inline-block text-left">
          <div>
            <div className="sm:inline-flex sm:justify-end">
              <label htmlFor="perPage" className="sr-only">
                {t("display_per_page")}
              </label>
              <SelectInput
                name="perPage"
                className="w-full"
                defaultValue={10}
                onChange={(e) => handlePerPageChange(e.target.value)}
                placeholder={"Display per page"}
                options={["10", "20", "50", "100"].map((i) => ({
                  value: i,
                  label: i,
                }))}
              ></SelectInput>
            </div>
          </div>
        </div>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
      >
        {reportedPostsResponse?.data.map(
          (reportedPost: {
            id: string;
            outstanding_reports: number;
            post: ApiModel.Post;
          }) => {
            return (
              <ReportedPostItem
                key={reportedPost.id}
                id={reportedPost.id}
                post={reportedPost.post}
                outstanding_reports={reportedPost.outstanding_reports}
              />
            );
          }
        )}
      </ul>

      <nav
        className="flex items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">{renderPaginationResults()}</div>
        <div className="flex flex-1 justify-between sm:justify-end gap-2">
          <Button
            type="button"
            onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
            disabled={page <= 1}
          >
            {t("previous")}
          </Button>
          <div className="block sm:hidden">{renderPaginationResults()}</div>
          <Button
            type="button"
            onClick={() => setPage((prev: number) => prev + 1)}
            disabled={perPage * page >= reportedPostsResponse?.total!}
          >
            {t("next")}
          </Button>
        </div>
      </nav>
    </div>
  );
};
