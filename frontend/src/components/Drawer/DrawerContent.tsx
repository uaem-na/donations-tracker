import { DrawerOverlay } from "@components/Drawer/DrawerOverlay";
import { DrawerPortal } from "@components/Drawer/DrawerPortal";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { classMerge } from "@utils/ClassMerge";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const drawerVariants = cva(
  "fixed z-50 gap-4 bg-background bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 overflow-y-scroll overflow-x-hidden",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-full md:max-w-2xl lg:max-w-full",
        right:
          "inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-full md:max-w-2xl lg:max-w-full",
      },
      size: {
        small: "w-full lg:w-1/3",
        medium: "w-full lg:w-2/4 ",
        large: "w-full lg:w-3/4",
      },
    },
    defaultVariants: {
      side: "right",
      size: "small",
    },
  }
);

interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerVariants> {}

const DrawerContent = forwardRef<
  ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ side = "right", size = "small", className, children, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={classMerge(drawerVariants({ side, size }), className)}
        {...props}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {children}
        <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <FontAwesomeIcon icon={faClose} className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DrawerPrimitive.Close>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

export { DrawerContent };
