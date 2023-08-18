import { StatusIndicator } from "@components/StatusIndicator/StatusIndicator";

export const getStatusIndicator = (status: string | boolean | undefined) => {
  switch (status) {
    case "open":
    case true:
      return <StatusIndicator status="online" />;
    case "in-progress":
      return <StatusIndicator status="away" />;
    case "closed":
    case false:
      return <StatusIndicator status="busy" />;
    default:
      return <StatusIndicator />;
  }
};
