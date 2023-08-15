import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Option = {
  label: string;
  value: string;
};

type SharedContainerProps = {
  name: string;
  activeClassNames: string;
  inactiveClassNames: string;
  ariaLabel: string;
  options: Option[];
  defaultOption?: Option;
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

  return (
    <>
      <div className="sm:hidden">
        <label htmlFor={name} className="sr-only">
          {ariaLabel}
        </label>
        <select
          name={name}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={selected[0].value}
          onChange={(e) => handleChange(e.target.value)}
        >
          {optionsWithAll.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label={ariaLabel}>
          {optionsWithAll.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange(option.value)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                selected.find(matchByValue(option.value))
                  ? activeClassNames
                  : inactiveClassNames
              }`}
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
