import { Badge } from "@components/Badge";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetSessionQuery } from "@services/api";
import { getStatusIndicator } from "@utils/GetStatusIndicator";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface UserItemProps {
  id: string;
  displayName: string;
  verified: boolean;
  type: string;
}

export const UserItem = ({
  id,
  displayName,
  verified,
  type,
}: UserItemProps) => {
  const { t } = useTranslation();
  const { data: currentSession } = useGetSessionQuery();
  const [starred, setStarred] = useState(false);

  useEffect(() => {
    if (currentSession) {
    }
  }, [currentSession]);

  const getColorForBadge = (type: string) => {
    switch (type) {
      case "admin":
        return "green";
      case "individual":
        return "purple";
      default:
        return "blue";
    }
  };

  return (
    <li className="flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
      <div className="grow relative flex">
        <div className="grow flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link to={`/admin/users/${id}`}>
                <span className="absolute inset-0 -mx-4 -my-5"></span>
                <Badge
                  color={getColorForBadge(type)}
                  text={t(`users.${type}`)}
                  width="w-24"
                />
                <span className="mx-2">{`${displayName}`}</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <span className="flex items-center gap-2">
              {getStatusIndicator(verified)}
              <span className="text-sm">
                {verified ? t("users.verified") : t("users.not_verified")}
              </span>
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
