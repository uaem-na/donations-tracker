import { classMerge } from "@utils/ClassMerge";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ",
  {
    variants: {
      intent: {
        primary:
          "bg-purple-800 text-white hover:bg-purple-700 focus-visible:outline-purple-600",
        secondary:
          "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 ring-1 ring-inset",
        danger:
          "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-400",
        "outline-danger":
          "bg-white text-red-600 ring-red-600 ring-1 ring-inset hover:bg-red-50",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(({ intent, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={classMerge(
        buttonVariants({ intent }),
        props.className,
        props.disabled && "disabled:cursor-not-allowed disabled:opacity-50"
      )}
    >
      {props.children}
    </button>
  );
});
