import { Toast } from "@components";
import { generateRandomID } from "@utils/GenerateRandomID";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export interface IToast {
  id?: string;
  content: string | React.ReactNode;
  duration?: number;
  type?: "info" | "warn" | "error" | "success";
}

export type ToastContextType = {
  open: ({ content, duration, type }: IToast) => void;
};
export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType
);

export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const handleCloseToastKeyboardEvent = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (toasts[0]) {
        close(toasts[0].id);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleCloseToastKeyboardEvent);
    return () => {
      window.removeEventListener("keydown", handleCloseToastKeyboardEvent);
    };
  }, [toasts]);

  const open = (props: IToast) =>
    setToasts((currentToasts) => {
      const toast = {
        ...props,
        ...{
          id: generateRandomID(),
        },
      };
      return [...currentToasts, toast];
    });

  const close = (id: string | undefined) => {
    if (id) {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      );
    }
  };

  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {createPortal(
        <div className="absolute top-10 right-5 z-50">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              close={() => close(toast.id)}
              duration={toast.duration}
              type={toast.type}
            >
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
