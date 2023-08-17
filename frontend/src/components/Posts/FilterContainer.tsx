import { CollapseIcon, ExpandIcon } from "@components/Icons";
import { classMerge } from "@utils/ClassMerge";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Option = {
  label: string;
  value: string;
};

type SharedContainerProps = {
  name: string;
  activeClassNames?: string;
  inactiveClassNames?: string;
  ariaLabel: string;
  options: Option[];
  defaultOption?: Option;
  defaultExpanded?: boolean;
};

type FilterContainerProps<TMultiple = boolean> = TMultiple extends true
  ? SharedContainerProps & {
      multiSelect: TMultiple;
      onChange?: (option: Option[]) => void;
    }
  : SharedContainerProps & {
      multiSelect: TMultiple;
      onChange?: (option: Option) => void;
    };

export const FilterContainer = ({
  name,
  multiSelect,
  activeClassNames,
  inactiveClassNames,
  ariaLabel,
  options,
  defaultOption,
  onChange,
  defaultExpanded = true,
}: FilterContainerProps) => {
  const { t } = useTranslation();
  const optionsWithAll = [
    {
      label: t("all"),
      value: "all",
    },
    ...options,
  ];
  const [selected, setSelected] = useState<Option[]>([
    defaultOption ?? optionsWithAll[0],
  ]);

  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  useEffect(() => {
    if (onChange) {
      if (multiSelect) {
        onChange(selected);
      } else {
        onChange(selected[0]);
      }
    }
  }, [selected]);

  const matchByValue = (value: string) => (option: Option) =>
    option.value === value;

  const handleChange = (value: string) => {
    const selectedOption = optionsWithAll.find(matchByValue(value));
    if (!selectedOption) {
      throw new Error(`Option with value ${value} not found`);
    }

    // if multi select is enabled, simply set the selected array to the selectedOption
    if (!multiSelect) {
      setSelected([selectedOption]);
      return;
    }

    // otherwise, handle multi select
    const alreadySelected = selected.find(matchByValue(value));
    if (alreadySelected) {
      // Option is already selected, remove it
      const filtered = selected.filter((option) => option.value !== value);
      if (!filtered || filtered.length === 0) {
        // If there are no options selected, set the default option
        setSelected([defaultOption ?? optionsWithAll[0]]);
      } else {
        // Else, set selected array to the filtered array
        setSelected(filtered);
      }
    } else {
      // Option is not already selected, add it
      if (selectedOption.value === "all") {
        // If selectedOption is all, remove all options other than all
        setSelected([selectedOption]);
      } else {
        // Else, remove "all" option from selected array and add selectedOption
        const filtered = selected.filter((option) => option.value !== "all");
        setSelected([...filtered, selectedOption]);
      }
    }
  };

  const renderSingleFilter = () => {
    return (
      <>
        <h3 className="sr-only">{ariaLabel}</h3>
        <ul
          role="list"
          className="space-y-1.5 border-b border-gray-200 pb-6 text-sm font-medium"
        >
          {optionsWithAll.map((option) => (
            <li
              key={option.value}
              className={classMerge(
                "rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer",
                selected.find(matchByValue(option.value))
                  ? activeClassNames
                  : inactiveClassNames
              )}
              onClick={() => handleChange(option.value)}
            >
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const renderMultiFilter = () => {
    return (
      <>
        <h3 className="-my-3 flow-root">
          <button
            type="button"
            className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
            aria-controls="filter-section-1"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <span className="font-medium text-gray-900">{ariaLabel}</span>
            <span className="ml-6 flex items-center">
              <span className="ml-6 flex h-7 items-center">
                {expanded ? <CollapseIcon /> : <ExpandIcon />}
              </span>
            </span>
          </button>
        </h3>
        <div className={classMerge("pt-6 px-3", expanded ? "block" : "hidden")}>
          <div className="space-y-4">
            {optionsWithAll.map((option, index) => {
              return (
                <div key={option.value} className="flex items-center ">
                  <input
                    id={option.value}
                    name={`${name}[]`}
                    value={option.value}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-purple-800 focus:ring-purple-700"
                    onChange={(e) => handleChange(e.target.value)}
                    checked={!!selected.find(matchByValue(option.value))}
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return <>{!multiSelect ? renderSingleFilter() : renderMultiFilter()}</>;
};
