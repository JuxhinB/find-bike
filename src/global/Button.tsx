import React from "react";

interface ButtonProps {
  children: JSX.Element;
  onClick?: (arg?: any) => any;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: "button" | "submit";
}

function Button({
  children,
  onClick = () => undefined,
  loading = false,
  disabled = false,
  htmlType = "button",
}: ButtonProps): JSX.Element {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={`btn`}
      disabled={loading || disabled}
    >
      {loading && (
        <i className="las la-circle-notch animate-spin text-xl mr-2" />
      )}
      <span>{children}</span>
    </button>
  );
}

export default Button;
