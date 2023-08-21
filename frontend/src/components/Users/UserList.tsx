import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiModel } from "@services/api";
import { useTranslation } from "react-i18next";
import { UserItem } from "./UserItem";

interface UserListProps {
  users: ApiModel.User[] | undefined;
}

export const UserList = ({ users }: UserListProps) => {
  const { t } = useTranslation();
  if (users === undefined || users.length === 0) {
    return (
      <>
        <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <FontAwesomeIcon
            className="mx-auto h-12 w-12 text-gray-400"
            icon={faRectangleList}
          />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            {t("users.no_users_found")}
          </span>
        </div>
      </>
    );
  }

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
    >
      {users?.map((user: ApiModel.User) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            displayName={user.displayName}
            verified={user.verified}
            type={user.role}
          />
        );
      })}
    </ul>
  );
};
