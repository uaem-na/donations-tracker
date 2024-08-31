import { Badge } from "@components/Badge";
import autoAnimate from "@formkit/auto-animate";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiModel } from "@store/services/types";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
interface ReportSummaryItemProps {
  report: ApiModel.Report;
}

const SummaryItem = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="pt-2">
      <dt>
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
          </span>
        </button>
      </dt>
      {isExpanded && (
        <div className="pt-6">
          <p className="font-semibold">{props.label}</p>
          <dd className="text-base leading-7 text-gray-600" ref={parent}>
            {props.children}
          </dd>
        </div>
      )}
    </div>
  );
};

export const ReportSummaryItem = ({ report }: ReportSummaryItemProps) => {
  const { t } = useTranslation();
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
        <SummaryItem label="Report Summary">
          <p className="leading-5 text-xs mt-2 text-gray-500">{report.notes}</p>
        </SummaryItem>
      </div>
    </li>
  );
};
