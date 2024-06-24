import { PerPageOption } from "@components";
import { ReportsByUserPage } from "@pages/Admin/ReportsByUser";
import { useGetReportedPostsQuery, useGetSessionQuery } from "@services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export const MyReports = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPageOption>(10);

  const { data: user, isLoading: isSessionLoading } = useGetSessionQuery();
  const loggedInUserId = user?.id!;
  const { data: postsResponse, isLoading: isPostsLoading } =
    useGetReportedPostsQuery({
      userId: loggedInUserId,
      per_page: perPage,
      page: page,
    });
  return <ReportsByUserPage />;
};
