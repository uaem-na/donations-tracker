import { ReactNode } from "react";

interface IBadgeProps {
  color:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
  text: string | ReactNode;
}

export const Badge = ({ color, text }: IBadgeProps) => {
  const badgeColor = () => {
    switch (color) {
      case "red":
        return "bg-red-50 text-red-700 ring-red-500/10";
      case "yellow":
        return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
      case "green":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "blue":
        return "bg-blue-50 text-blue-700 ring-blue-700/10";
      case "indigo":
        return "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
      case "purple":
        return "bg-purple-50 text-purple-700 ring-purple-700/10";
      case "pink":
        return "bg-pink-50 text-pink-700 ring-pink-700/10";
      case "gray":
      default:
        return "bg-gray-50 text-gray-600 ring-gray-500/10";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColor()}`}
    >
      {text}
    </span>
  );
};
