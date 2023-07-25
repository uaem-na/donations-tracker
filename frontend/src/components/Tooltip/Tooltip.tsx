import { ELEVATIONS } from "@constants";
import * as Tooltip from "@radix-ui/react-tooltip";
import PropTypes from "prop-types";
import styled from "styled-components";

interface TooltipComponentProps {
  children: React.ReactNode;
  message: string;
  delayDuration?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

const TooltipComponent = ({
  children,
  message,
  delayDuration = 500,
  side = "top",
  align = "center",
}: TooltipComponentProps) => {
  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root>
        <TooltipTrigger>{children}</TooltipTrigger>
        <Tooltip.Portal>
          <TooltipContent side={side} align={align}>
            {message}
            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

TooltipComponent.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.string.isRequired,
};

const TooltipTrigger = styled(Tooltip.Trigger)`
  text-decoration: underline 2px dotted var(--color-primary);
  text-underline-offset: 0.2em;
`;

const TooltipContent = styled(Tooltip.Content)`
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 1;
  color: inherit;
  background-color: white;
  box-shadow: ${ELEVATIONS.medium};
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 9999;
`;

const TooltipArrow = styled(Tooltip.Arrow)`
  fill: white;
`;

export default TooltipComponent;
