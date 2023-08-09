import { StatusIndicator } from "@components/StatusIndicator/StatusIndicator";

export const getStatusIndicator = (status: string | undefined) => {
  switch (status) {
    case "open":
      return <StatusIndicator status="online" />;
    case "in-progress":
      return <StatusIndicator status="away" />;
    case "closed":
      return <StatusIndicator status="busy" />;
    default:
      return <StatusIndicator />;
  }
};
