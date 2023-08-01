import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const classMerge = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
