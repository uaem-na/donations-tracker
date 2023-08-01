import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { classMerge } from "@utils/ClassMerge";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const DrawerTitle = forwardRef<
  ElementRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={classMerge("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

export { DrawerTitle };
