import {
  FilterContainer,
  FilterPostType,
  FilterUserType,
  Option,
} from "@components";
import { SelectInput } from "@components/Controls/Select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "@components/Drawer";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Popover from "@radix-ui/react-popover";
import { ApiModel } from "@services/api";
import { formatISO } from "date-fns";
import { PropsWithChildren, useState } from "react";
import { ClassNames, DayPicker, DayPickerSingleProps } from "react-day-picker";
import dayPickerStyles from "react-day-picker/dist/style.module.css";
import { useTranslation } from "react-i18next";

interface IFilterLayoutProps extends PropsWithChildren {
  heading: string;
  handlePerPageChange: (val: string) => void;
  handlePostTypeFilterChange: (postType: FilterPostType) => void;
  handleUserTypeFilterChange: (userType: FilterUserType) => void;
  handleCategoryFilterChange: (categories: ApiModel.PostItemCategory[]) => void;
  handleDateFilterChange: (date: Date) => void;
  categories: ApiModel.PostItemCategory[];
  filters: {
    postType: boolean;
    userType: boolean;
    categories: boolean;
    date?: boolean;
  };
}

let datePickerOptions: DayPickerSingleProps = {
  mode: "single",
  fromDate: new Date(2023, 1, 1),
  toDate: new Date(),
  showOutsideDays: true,
  fixedWeeks: true,
};

let datePickerClassNames: ClassNames = {
  ...dayPickerStyles,
  root: dayPickerStyles.root + " bg-white rounded-lg shadow-lg p-6 m-0",
  day_selected: "!bg-purple-100 !text-purple-800",
};

export const FilterLayout = ({
  heading,
  handlePerPageChange,
  handlePostTypeFilterChange,
  handleUserTypeFilterChange,
  handleCategoryFilterChange,
  handleDateFilterChange,
  categories,
  filters,
  children,
}: IFilterLayoutProps) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<Option>();
  const [selectedUserType, setSelectedUserType] = useState<Option>();
  const [selectedCategories, setSelectedCategories] = useState<Option[]>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDayPickerOpen, setIsDayPickerOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          {heading}
        </h1>

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

          <Drawer>
            <DrawerTrigger asChild>
              <button
                type="button"
                className="-m-2 ml-2 mt-0.5 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </DrawerTrigger>
            <DrawerContent size="small">
              <DrawerHeader>Filters</DrawerHeader>
              <DrawerDescription asChild>
                <div className="mt-6">
                  {filters.postType && (
                    <div>
                      <FilterContainer
                        name="mobile_postType"
                        activeClassNames="bg-purple-100 text-purple-800"
                        inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        ariaLabel={t("posts.select_type")}
                        options={[
                          { value: "request", label: t("posts.requests") },
                          { value: "offer", label: t("posts.offers") },
                        ]}
                        multiSelect={false}
                        defaultOption={selectedType}
                        onChange={(option) => {
                          handlePostTypeFilterChange(
                            option.value as FilterPostType
                          );
                          setSelectedType(option);
                        }}
                      />
                    </div>
                  )}

                  {filters.userType && (
                    <div className="pt-6">
                      <FilterContainer
                        name="mobile_userType"
                        activeClassNames="bg-purple-100 text-purple-800"
                        inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        ariaLabel={t("posts.select_user_type")}
                        options={[
                          { value: "individual", label: t("users.individual") },
                          {
                            value: "organization",
                            label: t("users.organization"),
                          },
                        ]}
                        multiSelect={false}
                        defaultOption={selectedUserType}
                        onChange={(option) => {
                          handleUserTypeFilterChange(
                            option.value as FilterUserType
                          );
                          setSelectedUserType(option);
                        }}
                      />
                    </div>
                  )}

                  {filters.date && (
                    <div className="border-b border-gray-200 pt-3 pb-6">
                      <div className="flex flex-wrap w-full items-center justify-between bg-white py-3 text-sm text-gray-700 hover:text-gray-900">
                        <span className="ml-1 font-medium text-gray-900">
                          {t("posts.select_date")}
                        </span>
                        <span className="mr-1">
                          {selectedDate &&
                            formatISO(selectedDate, {
                              representation: "date",
                            })}
                        </span>
                        <span className="flex w-full justify-center">
                          <DayPicker
                            {...datePickerOptions}
                            classNames={datePickerClassNames}
                            selected={selectedDate}
                            onSelect={(value) => {
                              handleDateFilterChange(value);
                              setSelectedDate(value);
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  )}

                  {filters.categories && (
                    <div className="border-b border-gray-200 pt-6 last:pb-6">
                      <FilterContainer
                        name="mobile_category"
                        ariaLabel={t("posts.category")}
                        options={categories ?? []}
                        multiSelect={true}
                        defaultOption={selectedCategories}
                        onChange={(options) => {
                          handleCategoryFilterChange(options);
                          setSelectedCategories(options);
                        }}
                      />
                    </div>
                  )}
                </div>
              </DrawerDescription>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <section aria-labelledby="posts-heading" className="pb-24 pt-6">
        <h2 id="posts-heading" className="sr-only">
          {t("posts.title")}
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <form className="hidden lg:block">
            {filters.postType && (
              <div>
                <FilterContainer
                  name="postType"
                  activeClassNames="bg-purple-100 text-purple-800"
                  inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  ariaLabel={t("posts.select_type")}
                  options={[
                    { value: "request", label: t("posts.requests") },
                    { value: "offer", label: t("posts.offers") },
                  ]}
                  multiSelect={false}
                  onChange={(option) => {
                    handlePostTypeFilterChange(option.value as FilterPostType);
                    setSelectedType(option);
                  }}
                  setValue={selectedType}
                />
              </div>
            )}

            {filters.userType && (
              <div className="pt-6">
                <FilterContainer
                  name="userType"
                  activeClassNames="bg-purple-100 text-purple-800"
                  inactiveClassNames="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  ariaLabel={t("posts.select_user_type")}
                  options={[
                    { value: "individual", label: t("users.individual") },
                    { value: "organization", label: t("users.organization") },
                  ]}
                  multiSelect={false}
                  onChange={(option) => {
                    handleUserTypeFilterChange(option.value as FilterUserType);
                    setSelectedUserType(option);
                  }}
                  setValue={selectedUserType}
                />
              </div>
            )}

            {filters.date && (
              <div className="border-b border-gray-200 pt-3 pb-3">
                <h3 className="flow-root">
                  <Popover.Root
                    open={isDayPickerOpen}
                    onOpenChange={setIsDayPickerOpen}
                  >
                    <Popover.Trigger asChild>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                      >
                        <span className="ml-1 font-medium text-gray-900">
                          {t("posts.select_date")}
                        </span>
                        <span className="mr-1">
                          {selectedDate &&
                            formatISO(selectedDate, {
                              representation: "date",
                            })}
                        </span>
                      </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content side="right" sideOffset={4}>
                        <DayPicker
                          {...datePickerOptions}
                          classNames={datePickerClassNames}
                          selected={selectedDate}
                          onSelect={(value) => {
                            handleDateFilterChange(value);
                            setSelectedDate(value);
                            setIsDayPickerOpen(false);
                          }}
                        />
                        <Popover.Arrow width={20} height={10} />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </h3>
              </div>
            )}

            {filters.categories && (
              <div className="border-b border-gray-200 pt-6 last:pb-6">
                <FilterContainer
                  name="category"
                  ariaLabel={t("posts.category")}
                  options={categories ?? []}
                  multiSelect={true}
                  onChange={(options) => {
                    handleCategoryFilterChange(options);
                    setSelectedCategories(options);
                  }}
                  setValue={selectedCategories}
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
