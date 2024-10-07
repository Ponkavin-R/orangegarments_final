// src/components/ui/button.jsx
import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, className, variant = "primary", size = "md", ...props }) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Button;
