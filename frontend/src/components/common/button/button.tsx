import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  backgroundColor?: string;
  color?: string;
  height?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  backgroundColor = "bg-blue-950",
  color = "text-white",
  height = "h-[48px]",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-lg ${backgroundColor} ${color} ${height} hover:brightness-95 outline-black outline-offset-1 hover:outline-2 hover:outline-dashed`}
    >
      {children}
    </button>
  );
};

export default Button;
