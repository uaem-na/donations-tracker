import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classMerge } from "@utils";
import { PropsWithChildren, useCallback } from "react";

export type AlertTypes = "info" | "warn" | "error" | "success";

interface IAlertProps {
  type: AlertTypes;
  heading?: string;
  className?: string;
}

export const Alert = ({
  type,
  heading,
  children,
  className,
}: PropsWithChildren<IAlertProps>) => {
  const renderTypeIcon = () => {
    switch (type) {
      case "info":
        return (
          <FontAwesomeIcon
            className="h-5 w-5 text-blue-400"
            icon={faCircleInfo}
          />
        );
      case "warn":
        return (
          <FontAwesomeIcon
            className="h-5 w-5 text-yellow-400"
            icon={faTriangleExclamation}
          />
        );
      case "error":
        return (
          <FontAwesomeIcon
            className="h-5 w-5 text-red-400"
            icon={faCircleXmark}
          />
        );
      case "success":
        return (
          <FontAwesomeIcon
            className="h-5 w-5 text-green-400"
            icon={faCircleCheck}
          />
        );
    }
  };

  const backgroundColor = () => {
    const colorLevel = 50;
    switch (type) {
      case "info":
        return `bg-blue-50`;
      case "warn":
        return `bg-yellow-50`;
      case "error":
        return `bg-red-50`;
      case "success":
        return `bg-green-50`;
    }
  };

  const headerTextColor = () => {
    switch (type) {
      case "info":
        return `text-blue-800`;
      case "warn":
        return `text-yellow-800`;
      case "error":
        return `text-red-800`;
      case "success":
        return `text-green-800`;
    }
  };

  const messageTextColor = () => {
    switch (type) {
      case "info":
        return `text-blue-700`;
      case "warn":
        return `text-yellow-700`;
      case "error":
        return `text-red-700`;
      case "success":
        return `text-green-700`;
    }
  };

  return (
    <div className={`rounded-md p-4 ${backgroundColor()}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0 self-center">{renderTypeIcon()}</div>
        <div className="ml-3 w-full">
          {heading && (
            <h3 className={`text-sm font-medium ${headerTextColor()}`}>
              {heading}
            </h3>
          )}
          <div
            className={classMerge(
              `text-sm ${messageTextColor()}`,
              { "mt-2": heading },
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
