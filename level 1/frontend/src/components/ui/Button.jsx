import clsx from "clsx";
import { useMemo } from "react";

const Button = ({
  size,
  loading,
  loadingText = "Loading...",
  onClick,
  children,
  disabled,
  icon,
  iconPosition,
}) => {
  const buttonClass = useMemo(
    () => clsx("btn", size, { loading, disabled }),
    [size, loading, disabled],
  );
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? loadingText : children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
