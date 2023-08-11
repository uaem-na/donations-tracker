import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classMerge } from "@utils/ClassMerge";
import { forwardRef, InputHTMLAttributes } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  InputHTMLAttributes<HTMLTextAreaElement> & {
    errorMessage?: string;
    rows?: number;
  }
>(({ errorMessage, rows, ...props }, ref) => {
  return (
    <>
      <div className="relative mt-2">
        <textarea
          ref={ref}
          {...props}
          rows={rows || 4}
          aria-invalid={errorMessage ? "true" : "false"}
          className={classMerge(
            "block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
            errorMessage
              ? "text-red-900 ring-red-400 placeholder:text-red-400 focus:ring-red-500"
              : "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-purple-800",
            props.disabled &&
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200",
            props.className
          )}
        ></textarea>
        {errorMessage && (
          <div className="pointer-events-none absolute inset-y-0 top-0 right-0 flex pt-3 pr-3">
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
