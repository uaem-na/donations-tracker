import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { classMerge } from "@utils/ClassMerge";

const DrawerPortal = ({
  className,
  ...props
}: DrawerPrimitive.DialogPortalProps) => (
  <DrawerPrimitive.Portal className={classMerge(className)} {...props} />
);
DrawerPortal.displayName = DrawerPrimitive.Portal.displayName;

export { DrawerPortal };
