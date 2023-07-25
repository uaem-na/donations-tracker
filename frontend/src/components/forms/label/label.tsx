import * as RadixLabel from "@radix-ui/react-label";
import { forwardRef, LabelHTMLAttributes } from "react";

export const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ ...props }, ref) => {
  return (
    <RadixLabel.Root
      className={`block text-sm font-medium leading-6 text-gray-900 ${props.className}`}
      {...props}
      ref={ref}
    >
      {props.children}
    </RadixLabel.Root>
  );
});
