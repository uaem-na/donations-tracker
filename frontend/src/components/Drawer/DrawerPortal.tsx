import * as DrawerPrimitive from "@radix-ui/react-dialog";

const DrawerPortal = ({ ...props }: DrawerPrimitive.DialogPortalProps) => (
  <DrawerPrimitive.Portal {...props} />
);
DrawerPortal.displayName = DrawerPrimitive.Portal.displayName;

export { DrawerPortal };
