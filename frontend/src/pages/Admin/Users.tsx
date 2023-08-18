import { UsersContainer } from "@components/Users/UsersContainer";
import { FilterUserType, PerPageOption } from "@components/Users/types";
import { useGetUsersAdminQuery } from "@store/services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const AdminUsersPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPageOption>(10);

  // default filter should be "all" otherwise 400 error will be returned
  const [userType, setUserType] = useState<FilterUserType>("all");
  const { data: usersResponse, isLoading } = useGetUsersAdminQuery({
    per_page: perPage,
    page: page,
    user_type: userType,
  });

  return (
    <div className="px-4 py-5">
      <UsersContainer
        heading={t("users.title")}
        isLoading={isLoading}
        users={usersResponse?.data}
        page={usersResponse?.page ?? 0}
        perPage={perPage}
        total={usersResponse?.total ?? 0}
        updatePage={setPage}
        updatePerPage={setPerPage}
        updateUserType={setUserType}
        filters={{ userType: true }}
      />
    </div>
  );
};

export default AdminUsersPage;
