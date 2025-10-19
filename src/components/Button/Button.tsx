import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  secondary?: boolean;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const Button = ({
  children,
  secondary = false,
  size = "medium",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    secondary ? styles.secondary : styles.primary,
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
