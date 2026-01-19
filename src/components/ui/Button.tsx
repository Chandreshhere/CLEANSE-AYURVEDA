import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium tracking-wide";

  const variantStyles = {
    primary: "bg-white text-dark-brown",
    secondary: "bg-dark-brown text-white",
    outline: "bg-transparent border-2 border-dark-brown text-dark-brown",
  };

  const sizeStyles = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-10 py-4 text-base",
    lg: "px-12 py-5 text-lg",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};

export default Button;
