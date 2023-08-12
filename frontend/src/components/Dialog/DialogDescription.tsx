import * as DialogPrimitive from "@radix-ui/react-dialog";
import { classMerge } from "@utils/ClassMerge";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={classMerge("text-sm text-gray-500", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { DialogDescription };
