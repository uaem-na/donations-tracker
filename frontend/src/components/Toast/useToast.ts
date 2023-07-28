import { ToastContext } from "@components/Toast/ToastProvider";
import { useContext } from "react";

export const useToast = () => useContext(ToastContext);
