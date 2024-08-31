import { Badge } from "@components/Badge";
import { Link } from "@components/Controls";
import autoAnimate from "@formkit/auto-animate";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiModel } from "@store/services/types";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface SummaryItemProps {
  label: string;
  postId: string;
  children: React.ReactNode;
}

interface ReportSummaryItemProps {
  report: ApiModel.Report;
}

const SummaryItem = ({ label, postId, children }: SummaryItemProps) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="pt-2">
      <div>
        <button
          type="button"
          className="flex w-full items-center justify-between text-left text-gray-900"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="flex h-7 items-center">
            <FontAwesomeIcon
              className="h-5 w-5 flex-none text-gray-400"
              icon={isExpanded ? faChevronDown : faChevronRight}
            />
            <span className="ml-2 font-semibold">{label}</span>
          </span>
        </button>
      </div>
      {isExpanded && (
        <div className="flex flex-col">
          <div className="text-base leading-7 text-gray-600" ref={parent}>
            {children}
          </div>
          <Link to={`/admin/reports/post/${postId}`} className="self-end">
            {t("open")}
          </Link>
        </div>
      )}
    </div>
  );
};

export const ReportSummaryItem = ({ report }: ReportSummaryItemProps) => {
  const { t } = useTranslation();
  const categoryString =
    t(`posts.item_categories.${report.post.item.category}`) || "";
  const summaryLabel = `[${categoryString}] ${report.post.item.name}`;

  return (
    <li
      key={report.id}
      className="flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col grow">
        <div className="flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="first:text-sm leading-6 text-gray-900">
              <span className="font-semibold">{t("reports.reporter")}: </span>
              {report.reporter.displayName}
            </p>
          </div>

          <Badge
            color={report.status === "unresolved" ? "red" : "green"}
            text={t(`reports.${report.status}`)}
          />
        </div>
        <SummaryItem label={summaryLabel} postId={report.post.id}>
          <p className="leading-5 text-xs mt-2 text-gray-500">{report.notes}</p>
        </SummaryItem>
      </div>
    </li>
  );
};
