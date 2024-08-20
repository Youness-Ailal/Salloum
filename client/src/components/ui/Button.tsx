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
  isLoading?: boolean;
};

function Button({
  as = "button",
  to,
  className,
  children,
  variant = "default",
  blueOutline = false,
  isLoading,
  ...props
}: ButtonProps) {
  const childrenNode = (
    <>
      {isLoading && (
        <p className="absolute top-0 left-0 h-full w-full bg-sky-800 flex items-center justify-center">
          <span className="spin absolute top-1/2 left-1/2 h-[60%] rounded-full aspect-square border-[4px] border-r-transparent border-sky-50/80"></span>
        </p>
      )}
      {children}
    </>
  );
  if (as === "link")
    return (
      <Link
        className={cn(
          "bg-sky-700 text-white h-full  transition border border-transparent px-6 py-3 text-lg xl:text-xl uppercase font-medium tracking-wide rounded-sm flex items-center gap-2 disabled:bg-sky-400 disabled:hover:bg-sky-400 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed lg:gap-4 ",
          {
            "bg-transparent border-white": variant === "outline",
            "hover:bg-sky-600": variant === "default",
            "border-sky-600 text-sky-600": variant === "outline" && blueOutline,
          },
          className
        )}
        to={to || "/"}>
        {childrenNode}
      </Link>
    );
  return (
    <button
      disabled={isLoading}
      className={cn(
        "bg-sky-700  text-white h-full  transition border border-transparent px-6 py-3 text-lg xl:text-xl uppercase font-medium tracking-wide rounded-sm flex items-center gap-2 disabled:bg-sky-400 disabled:hover:bg-sky-400 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed lg:gap-4 ",
        {
          "bg-transparent border-white": variant === "outline",
          "hover:bg-sky-600": variant === "default",
          "border-sky-600 text-sky-600": variant === "outline" && blueOutline,
        },
        className
      )}
      {...props}>
      {childrenNode}
    </button>
  );
}

export default Button;
