import { Badge } from "@components/Badge";
import { StatusIndicator } from "@components/StatusIndicator";
import { UserRole } from "@constants";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiModel } from "@store/services/types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface UserItemProps {
  user: ApiModel.User;
}

export const UserItem = ({ user }: UserItemProps) => {
  const { t } = useTranslation();
  const { id, displayName, role } = user;

  const getColorForBadge = (type: string) => {
    switch (type) {
      case UserRole.ADMIN:
        return "green";
      case UserRole.INDIVIDUAL:
        return "purple";
      default:
        return "blue";
    }
  };

  const renderOrganizationVerificationStatus = () => {
    if (role !== UserRole.ORGANIZATION || !user.organization) {
      return;
    }

    const isVerified = user.organization.verified;
    const color = isVerified ? "green" : "red";

    return (
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <span className="flex items-center gap-2">
          <StatusIndicator status={color} />
          <span className="text-sm">
            {isVerified ? t("users.verified") : t("users.not_verified")}
          </span>
        </span>
      </div>
    );
  };

  return (
    <li className="flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
      <div className="grow relative flex">
        <div className="grow flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link to={`${id}`}>
                <span className="absolute inset-0 -mx-4 -my-5"></span>
                <Badge
                  color={getColorForBadge(role)}
                  text={t(`users.${role}`)}
                  width="w-24"
                />
                <span className="mx-2">{`${displayName}`}</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          {renderOrganizationVerificationStatus()}
          <FontAwesomeIcon
            className="h-5 w-5 flex-none text-gray-400"
            icon={faChevronRight}
          />
        </div>
      </div>
    </li>
  );
};
