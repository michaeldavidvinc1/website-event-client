import React from "react";
import { Button } from "react-bootstrap";

export default function SButton({
  children,
  action,
  variant,
  size,
  loading,
  disabled,
  className,
}) {
  return (
    <Button
      className={className}
      onClick={action}
      variant={variant}
      disabled={disabled}
      size={size}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
}
