import {
  faCheckCircle,
  faCircleInfo,
  faCircleXmark,
  faClose,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTimeout } from "@hooks";
import { PropsWithChildren } from "react";

interface IToastProps {
  type?: "info" | "warn" | "error" | "success";
  close: () => void;
  duration?: number;
}

export const Toast = (props: PropsWithChildren<IToastProps>) => {
  useTimeout(props.close, props.duration && props.duration * 1000);

  const renderTypeIcon = () => {
    switch (props.type) {
      case "success":
        return (
          <>
            <FontAwesomeIcon className="w-5 h-5" icon={faCheckCircle} />
            <span className="sr-only">Check icon</span>
          </>
        );

      case "warn":
        return (
          <>
            <FontAwesomeIcon className="w-5 h-5" icon={faTriangleExclamation} />
            <span className="sr-only">Triangle exclamation icon</span>
          </>
        );

      case "error":
        return (
          <>
            <FontAwesomeIcon className="w-5 h-5" icon={faCircleXmark} />
            <span className="sr-only">Cross icon</span>
          </>
        );

      case "info":
      default:
        return (
          <>
            <FontAwesomeIcon className="w-5 h-5" icon={faCircleInfo} />
            <span className="sr-only">Info icon</span>
          </>
        );
    }
  };

  const textAndBackgroundColor = () => {
    switch (props.type) {
      case "success":
        return "text-green-500 bg-green-100";
      case "warn":
        return "text-yellow-500 bg-yellow-100";
      case "error":
        return "text-red-500 bg-red-100";
      case "info":
      default:
        return "text-blue-500 bg-blue-100";
    }
  };

  return (
    <div
      aria-live="assertive"
      className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ring-1 ring-black ring-opacity-5 "
      role="alert"
    >
      <div className="flex items-center divide-x divide-gray-200 space-x-4 ">
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${textAndBackgroundColor()}`}
        >
          {renderTypeIcon()}
        </div>
        <div className="px-4  text-sm font-normal">{props.children}</div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={props.close}
      >
        <span className="sr-only">Close</span>
        <FontAwesomeIcon className="w-3 h-3" icon={faClose} />
      </button>
    </div>
  );
};
