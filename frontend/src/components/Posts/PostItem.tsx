import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface PostItemProps {
  id: string;
  title: string;
  status: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
}

export const PostItem = ({
  id,
  title,
  status,
  displayName,
  createdAt,
  updatedAt,
}: PostItemProps) => {
  const { t } = useTranslation();

  return (
    <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <Link to={`${id}`}>
              <span className="absolute inset-x-0 -top-px bottom-0"></span>
              {title}
            </Link>
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-500">
            <span className="relative truncate hover:underline"></span>
            {displayName}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{status}</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {t("posts.updated_at", { date: updatedAt })}
          </p>
        </div>
        <FontAwesomeIcon
          className="h-5 w-5 flex-none text-gray-400"
          icon={faChevronRight}
        />
      </div>
    </li>
  );
};
