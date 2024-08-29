import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ReportSummaryItemProps {
  id: string;
  summary: string;
}

export const ReportSummaryItem = ({ id, summary }: ReportSummaryItemProps) => {
  return (
    <li className="flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
      <div className="grow relative flex">
        <div className="grow flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {summary}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end"></div>
          <FontAwesomeIcon
            className="h-5 w-5 flex-none text-gray-400"
            icon={faChevronRight}
          />
        </div>
      </div>
    </li>
  );
};
