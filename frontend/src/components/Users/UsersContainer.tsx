import { Button } from "@components/Controls";
import { ApiModel } from "@services/api";
import { SetStateAction, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FilterLayout } from "./FilterLayout";
import { UserList } from "./UserList";
import { FilterUserType, PerPageOption, getPerPageOption } from "./types";

interface UsersContainerProps {
  heading: string;
  users?: ApiModel.User[];
  page: number;
  perPage: PerPageOption;
  total: number;
  isLoading: boolean;
  updatePage: (setter: SetStateAction<number>) => void;
  updatePerPage: (setter: SetStateAction<PerPageOption>) => void;
  updateUserType: (setter: SetStateAction<FilterUserType>) => void;
  filters: {
    userType: boolean;
  };
}

export const UsersContainer = ({
  heading,
  users,
  page,
  perPage,
  total,
  isLoading,
  updatePage,
  updatePerPage,
  updateUserType,
  filters,
}: UsersContainerProps) => {
  const { t } = useTranslation();

  const handlePerPageChange = (val: string) => {
    // update parent container state
    updatePage(1);
    updatePerPage(getPerPageOption(parseInt(val)));
  };

  const handleUserTypeFilterChange = (userType: FilterUserType) => {
    // update parent container state
    updatePage(1);
    updateUserType(userType);
  };

  const renderPaginationResults = useCallback(() => {
    return (
      <>
        <p className="flex gap-1 text-sm text-gray-700">
          <Trans
            i18nKey="showing_results"
            values={{
              from:
                total === 0
                  ? 0
                  : page === 1
                  ? 1
                  : page * perPage - (perPage - 1),
              to: page * perPage > total ? total : page * perPage,
              total: total,
            }}
            components={{
              from: <span className="font-medium" />,
              to: <span className="font-medium" />,
              total: <span className="font-medium" />,
            }}
          />
        </p>
      </>
    );
  }, [page, users]);

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <FilterLayout
      filters={filters}
      heading={heading}
      handlePerPageChange={(e) => handlePerPageChange(e)}
      handleUserTypeFilterChange={(option) =>
        handleUserTypeFilterChange(option)
      }
    >
      <div className="flex flex-col gap-y-4">
        <UserList users={users} />

        <nav
          className="flex items-center justify-between px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">{renderPaginationResults()}</div>
          <div className="flex flex-1 justify-between sm:justify-end gap-2">
            <Button
              type="button"
              onClick={() => updatePage((prev) => Math.max(prev - 1, 1))}
              disabled={page <= 1}
            >
              {t("previous")}
            </Button>
            <div className="block sm:hidden">{renderPaginationResults()}</div>
            <Button
              type="button"
              onClick={() => updatePage((prev) => prev + 1)}
              disabled={perPage * page >= total}
            >
              {t("next")}
            </Button>
          </div>
        </nav>
      </div>
    </FilterLayout>
  );
};
