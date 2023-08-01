import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { classMerge } from "@utils/ClassMerge";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const DrawerDescription = forwardRef<
  ElementRef<typeof DrawerPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={classMerge("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export { DrawerDescription };
