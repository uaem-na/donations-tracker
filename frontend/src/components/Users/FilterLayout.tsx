import {
  FilterContainer,
  FilterReportedUserType,
  FilterUserType,
} from "@components";
import { AdminGuide } from "@components/AdminGuide";
import { SelectInput } from "@components/Controls/Select";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
interface IFilterLayoutProps extends PropsWithChildren {
  heading: string;
  handlePerPageChange: (val: string) => void;
  handleUserTypeFilterChange: (userType: FilterUserType) => void;
  handleReportedUserFilterChange: (
    reportedUserType: FilterReportedUserType,
  ) => void;
  filters: {
    userType: boolean;
    reportedUser: boolean;
  };
}

// TODO: add additional filter container below user Type

export const FilterLayout = ({
  heading,
  handlePerPageChange,
  handleUserTypeFilterChange,
  handleReportedUserFilterChange,
  filters,
  children,
}: IFilterLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <div className="flex">
          <h1 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            {heading}
          </h1>
          <AdminGuide guideType={"users"} />
        </div>

        <div className="flex items-center">
          <div className="relative inline-block text-left">
            <div>
              <div className="sm:inline-flex sm:justify-end">
                <label htmlFor="perPage" className="sr-only">
                  {t("display_per_page")}
                </label>
                <SelectInput
                  name="perPage"
                  className="w-full"
                  defaultValue={10}
                  onChange={(e) => handlePerPageChange(e.target.value)}
                  placeholder={"Display per page"}
                  options={["10", "20", "50", "100"].map((i) => ({
                    value: i,
                    label: i,
                  }))}
                ></SelectInput>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="filters-heading" className="pb-24 pt-6">
        <h2 id="filters-heading" className="sr-only">
          {t("users.title")}
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <form className="hidden lg:block">
            {filters.userType && (
              <div className="pt-6">
                <FilterContainer
                  name="userType"
                  activeClassNames="bg-purple-100 text-purple-800"
                  inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  ariaLabel={t("users.select_user_type")}
                  options={[
                    { value: "admin", label: t("users.admin") },
                    { value: "individual", label: t("users.individual") },
                    { value: "organization", label: t("users.organization") },
                  ]}
                  multiSelect={false}
                  onChange={(option) =>
                    handleUserTypeFilterChange(option.value as FilterUserType)
                  }
                />
              </div>
            )}

            {filters.reportedUser && (
              <div className="border-gray-200 pt-6 last:pb-6">
                <FilterContainer
                  name="reportedUser"
                  activeClassNames="bg-purple-100 text-purple-800"
                  inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  ariaLabel={t("users.reported_states")}
                  multiSelect={false}
                  options={[
                    { value: "reported", label: t("users.reported_users") },
                  ]}
                  onChange={(option) => {
                    handleReportedUserFilterChange(
                      option.value as FilterReportedUserType,
                    );
                  }}
                />
              </div>
            )}
          </form>

          <div className="lg:col-span-3">{children}</div>
        </div>
      </section>
    </div>
  );
};
