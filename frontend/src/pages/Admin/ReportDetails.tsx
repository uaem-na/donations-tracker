import { PostDetails } from "@components";
import { Badge } from "@components/Badge";
import { Button } from "@components/Controls";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/Dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@components/Drawer";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ApiModel,
  useGetReportedPostQuery,
  useUpdateReportPostMutation,
} from "@services/api";
import { classMerge } from "@utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface ReportDetailsPageProps {}

export const ReportDetailsPage = ({}: ReportDetailsPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [unresolvedReports, setUnresolvedReports] = useState<ApiModel.Report[]>(
    []
  );
  const [resolvedReports, setResolvedReports] = useState<ApiModel.Report[]>([]);

  const { data: reportedPostResponse, isLoading } = useGetReportedPostQuery({
    postId: id!,
  });

  const [updateReportApi, { isSuccess, error }] = useUpdateReportPostMutation();

  useEffect(() => {
    const unresolved = reportedPostResponse?.filter(
      (x) => x.status === "unresolved"
    )!;
    setUnresolvedReports(unresolved);

    const resolved = reportedPostResponse?.filter(
      (x) => x.status === "resolved"
    )!;
    setResolvedReports(resolved);
  }, [reportedPostResponse]);

  const markAsResolved = (reportId: string) => {
    updateReportApi({ id: reportId, status: "resolved" });
  };

  const renderUnresolvedReports = () => {
    return (
      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
      >
        {unresolvedReports?.map((report) => {
          return (
            <li
              key={report.id}
              className="flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
            >
              <div className="grow relative flex-col">
                <div className="grow flex gap-x-4 mb-2">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm leading-6 text-gray-900">
                      <span className="flex items-center gap-2">
                        <Badge
                          color="red"
                          text={t(`reports.${report.status}`)}
                        />
                        <span className="font-semibold">
                          {t("reports.reporter")}:
                        </span>
                        {report.reporter.displayName}
                      </span>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                      {report.notes}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4 justify-end">
                  <div className="sm:flex sm:flex-col sm:items-end">
                    <span className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            intent="success"
                            // onClick={() => markAsResolved(report.id)}
                          >
                            {t("reports.mark_as_resolved")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t("reports.resolution")}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            {t("reports.confirmation")}
                          </DialogDescription>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                intent="success"
                                onClick={() => markAsResolved(report.id)}
                              >
                                {t("reports.mark_as_resolved")}
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderResolvedReports = () => {
    return (
      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
      >
        {resolvedReports?.map((report) => {
          return (
            <li
              key={report.id}
              className="flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
            >
              <div className="grow relative flex-col">
                <div className="grow flex gap-x-4 mb-2">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm leading-6 text-gray-900">
                      <span className="flex items-center gap-2">
                        <Badge
                          color="green"
                          text={t(`reports.${report.status}`)}
                        />
                        <span className="font-semibold">
                          {t("reports.reporter")}:
                        </span>
                        {report.reporter.displayName}
                      </span>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                      {report.notes}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderNoReportsFound = () => {
    return (
      <>
        <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <FontAwesomeIcon
            className="mx-auto h-12 w-12 text-gray-400"
            icon={faRectangleList}
          />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            {t("reports.no_reports_found")}
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="px-4 py-5">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900 flex items-center">
              <span className="mr-2">{t("reports.total_reports")}</span>
            </h1>
            <Drawer>
              <DrawerTrigger asChild>
                <Button type="button" intent="primary">
                  {t("reports.view_post_details")}
                </Button>
              </DrawerTrigger>
              <DrawerContent size="medium">
                <DrawerHeader>
                  <PostDetails
                    id={id!}
                    onError={() => {}}
                    redirectOnDelete={false}
                    hideReportButton={true}
                    hideEditDelete={true}
                  />
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                {t("reports.unresolved")}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-red-600">
                {unresolvedReports?.length}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                {t("reports.resolved")}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-500">
                {resolvedReports?.length}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6">
          <div className="block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  type="button"
                  onClick={() => setSelectedTabIndex(0)}
                  className={classMerge(
                    "whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium",
                    selectedTabIndex === 0
                      ? "border-purple-800 text-purple-700"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  {t("reports.unresolved")}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTabIndex(1)}
                  className={classMerge(
                    "whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium",
                    selectedTabIndex === 1
                      ? "border-purple-800 text-purple-700"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  {t("reports.resolved")}
                </button>
              </nav>
            </div>
          </div>

          <div className="my-5">
            {selectedTabIndex === 0
              ? unresolvedReports?.length > 0
                ? renderUnresolvedReports()
                : renderNoReportsFound()
              : null}
            {selectedTabIndex === 1
              ? resolvedReports?.length > 0
                ? renderResolvedReports()
                : renderNoReportsFound()
              : null}
          </div>
        </div>
      </div>
    </>
  );
};
