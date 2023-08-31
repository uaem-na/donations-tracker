import { Badge } from "@components/Badge";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiModel } from "@services/types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ReportedPostItemProps {
  id: string;
  post: ApiModel.Post;
  outstanding_reports: number;
}

export const ReportedPostItem = ({
  id,
  post,
  outstanding_reports,
}: ReportedPostItemProps) => {
  const { t } = useTranslation();

  const categoryString = t(`posts.item_categories.${post.item.category}`);

  return (
    <li className="flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
      <div className="grow relative flex">
        <div className="grow flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link to={`/admin/reports/post/${id}`}>
                <span className="absolute inset-0 -mx-4 -my-5"></span>
                <Badge
                  color={post.type === "offer" ? "purple" : "blue"}
                  text={t(`posts.${post.type}`)}
                  width="w-16"
                />
                <span className="mx-2">{`[${categoryString}] ${post.item.name}`}</span>
              </Link>
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              {post.author.displayName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <span className="flex items-center gap-2">
              <Badge
                color="red"
                text={`${outstanding_reports} ${
                  outstanding_reports > 1
                    ? t("reports.reports_outstanding")
                    : t("reports.reports_outstanding")
                }`}
              />
            </span>
          </div>
          <FontAwesomeIcon
            className="h-5 w-5 flex-none text-gray-400"
            icon={faChevronRight}
          />
        </div>
      </div>
    </li>
  );
};
