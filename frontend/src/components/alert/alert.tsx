import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";

interface IAlertProps {
  type: "info" | "warn" | "error" | "success";
  heading?: string;
}

export const Alert = ({
  type,
  heading,
  children,
}: PropsWithChildren<IAlertProps>) => {
  return (
    <div className="rounded-md bg-red-50 p-4" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <FontAwesomeIcon
            className="h-5 w-5 text-red-400"
            icon={faCircleXmark}
          />
        </div>
        <div className="ml-3">
          {heading && (
            <h3 className="text-sm font-medium text-red-800">
              There were 2 errors with your submission
            </h3>
          )}
          <div className={`text-sm text-red-700 ${heading && "mt-2"}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
