import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, InputHTMLAttributes } from "react";

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
  options: { value: string; label: string }[];
}

export const SelectInput = forwardRef<
  HTMLSelectElement,
  InputHTMLAttributes<HTMLSelectElement> & SelectInputProps
>(({ errorMessage, options, ...props }, ref) => {
  return (
    <>
      <div className="relative mt-2 rounded-md shadow-sm">
        <select
          ref={ref}
          {...props}
          aria-invalid={errorMessage ? "true" : "false"}
          className={`form-input block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
            props.className
          } ${
            errorMessage
              ? "text-red-900 ring-red-400 placeholder:text-red-400 focus:ring-red-500"
              : "ring-gray-300 placeholder:text-gray-400 focus:ring-purple-800"
          } ${
            props.disabled &&
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
          }`}
        >
          <option value="">{props.placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <FontAwesomeIcon
              className="h-5 w-5 text-red-500"
              icon={faCircleXmark}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </>
  );
});
