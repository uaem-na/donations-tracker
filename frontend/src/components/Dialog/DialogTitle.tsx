import * as DialogPrimitive from "@radix-ui/react-dialog";
import { classMerge } from "@utils/ClassMerge";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={classMerge(
      "text-base font-semibold leading-6 text-gray-900",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export { DialogTitle };
