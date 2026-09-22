import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | "default"
  | "rose"
  | "azure"
  | "gradient"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "glass";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-primary text-primary-foreground hover:opacity-90 ",
      rose: "bg-rose text-white hover:bg-rose-deep ",
      azure: "bg-azure text-white hover:bg-azure-deep ",
      gradient:
        "bg-linear-to-r from-rose to-azure text-white hover:opacity-95 shadow-md transition-opacity",
      glass:
        "bg-glass text-foreground ring-1 ring-glass-edge hover:bg-surface-strong shadow-xs backdrop-blur-md",
      outline:
        "border border-border bg-transparent hover:bg-muted/50 text-foreground",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-muted/50 text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }[variant];

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8.5 rounded-md px-3 text-xs",
      lg: "h-11 rounded-lg px-6 text-base font-semibold",
      icon: "h-9 w-9 rounded-lg",
    }[size];

    const combinedClassName = twMerge(
      clsx(baseStyles, variantStyles, sizeStyles, className)
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: twMerge(combinedClassName, child.props.className),
        ...props,
      });
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
