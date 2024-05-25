import {
    // TODO: check if there is filterReportedPosts
    FilterPostType,
    FilterUserType,
    getPerPageOption,
    PerPageOption,
    PostsContainer,
} from "@components";
import { useGetSessionQuery, useGetReportedPostsQuery } from "@services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReportedPostItem } from "@pages/Admin/components/ReportedPostItem";;
import { ReportsByUserPage } from "@pages/Admin/ReportsByUser";

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
    return (
        <ReportsByUserPage />
    );
};
