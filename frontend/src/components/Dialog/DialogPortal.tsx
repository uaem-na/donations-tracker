import * as DialogPrimitive from "@radix-ui/react-dialog";
import { classMerge } from "@utils/ClassMerge";

const DialogPortal = ({
  className,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={classMerge(className)} {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

export { DialogPortal };
