import * as Tooltip from "@radix-ui/react-tooltip";
import PropTypes from "prop-types";

interface TooltipComponentProps {
  children: React.ReactNode;
  message: string;
  delayDuration?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  asChild?: boolean;
}

const TooltipComponent = ({
  children,
  message,
  delayDuration = 500,
  side = "top",
  align = "center",
  asChild = false,
}: TooltipComponentProps) => {
  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            align={align}
            className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700"
          >
            {message}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

TooltipComponent.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.string.isRequired,
};

export default TooltipComponent;
