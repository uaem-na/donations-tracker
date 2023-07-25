import { ELEVATIONS } from "@constants";
import * as Tooltip from "@radix-ui/react-tooltip";
import PropTypes from "prop-types";
import styled from "styled-components";

// <button data-tooltip-target="tooltip-default" type="button"
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default
//   tooltip</button>
// <div id="tooltip-default" role="tooltip"
//      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
//   Tooltip content
//   <div className="tooltip-arrow" data-popper-arrow></div>
// </div>

const TooltipComponent = ({ children, message }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <TooltipTrigger asChild tabIndex={0}>
          {children}
        </TooltipTrigger>
        <Tooltip.Portal>
          <Tooltip.Content className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700">
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
`;

const TooltipArrow = styled(Tooltip.Arrow)`
  fill: white;
`;

export default TooltipComponent;
