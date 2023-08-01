import { classMerge } from "@utils/ClassMerge";
import { HTMLAttributes } from "react";

const DrawerHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={classMerge(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  );
};
DrawerHeader.displayName = "DrawerHeader";

export { DrawerHeader };
