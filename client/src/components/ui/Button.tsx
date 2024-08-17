import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type ButtonProps = ComponentProps<"button"> & {
  as?: "button" | "link";
  to?: string;
  children: React.ReactNode;
  className?: string;
  blueOutline?: boolean;
  variant?: "default" | "outline";
};

function Button({
  as = "button",
  to,
  className,
  children,
  variant = "default",
  blueOutline = false,
  ...props
}: ButtonProps) {
  if (as === "link")
    return (
      <Link
        className={cn(
          "bg-sky-700 text-white h-full  transition border border-transparent px-6 py-3 text-lg xl:text-xl uppercase font-medium tracking-wide rounded-sm flex items-center gap-2 disabled:bg-sky-400 disabled:hover:bg-sky-400 disabled:opacity-70 disabled:cursor-not-allowed lg:gap-4 ",
          {
            "bg-transparent border-white": variant === "outline",
            "hover:bg-sky-600": variant === "default",
            "border-sky-600 text-sky-600": variant === "outline" && blueOutline,
          },
          className
        )}
        to={to || "/"}>
        {children}
      </Link>
    );
  return (
    <button
      className={cn(
        "bg-sky-700 text-white h-full  transition border border-transparent px-6 py-3 text-lg xl:text-xl uppercase font-medium tracking-wide rounded-sm flex items-center gap-2 disabled:bg-sky-400 disabled:hover:bg-sky-400 disabled:opacity-70 disabled:cursor-not-allowed lg:gap-4 ",
        {
          "bg-transparent border-white": variant === "outline",
          "hover:bg-sky-600": variant === "default",
          "border-sky-600 text-sky-600": variant === "outline" && blueOutline,
        },
        className
      )}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
