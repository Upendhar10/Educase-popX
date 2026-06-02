import type { ReactNode, MouseEvent } from "react";
import { NavLink } from "react-router-dom";

const baseStyles = "w-full rounded-lg px-4 py-3 text-sm text-center font-semibold duration-200 transition-colors";

const variants = {
  primary:
    "bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-violet-400",
  secondary:
    "bg-violet-200 text-gray-800 hover:text-white hover:bg-violet-600 active:bg-violet-800 disabled:bg-violet-300",
  danger:
    "bg-red-500 active:bg-red-800 hover:bg-red-600 text-white",
};

type Variant = keyof typeof variants;

interface ButtonProps {
  to?: string;
  onClick?: (
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  children: ReactNode;
  variant?: Variant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  to,
  onClick,
  children,
  variant = "primary",
  type = "button",
  disabled = false,
}) => {
  const classes = `${baseStyles} ${variants[variant]} ${
    disabled
      ? "cursor-not-allowed opacity-50 grayscale-100"
      : "cursor-pointer"
  }`;

  // If button has "to" prop, render NavLink
  if (to) {
    return disabled ? (
      <div className={classes}>{children}</div>
    ) : (
      <NavLink to={to} className={classes} onClick={onClick}>
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;