interface IStatusIndicatorProps {
  status?: "offline" | "online" | "busy" | "away";
}

export const StatusIndicator = ({ status }: IStatusIndicatorProps) => {
  const statusColor = () => {
    switch (status) {
      case "online":
        return "text-green-400 bg-green-400/10";
      case "busy":
        return "text-red-400 bg-red-400/10";
      case "away":
        return "text-yellow-400 bg-yellow-400/10";
      case "offline":
      default:
        return "text-gray-500 bg-gray-100/10";
    }
  };

  return (
    <div className={`flex-none rounded-full p-1 ${statusColor()}`}>
      <div className="h-2 w-2 rounded-full bg-current"></div>
    </div>
  );
};
