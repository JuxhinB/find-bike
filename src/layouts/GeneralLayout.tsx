import React from "react";

interface GeneralLayoutProps {
  children: JSX.Element;
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <div className={"outer-container"}>
      <div className={"inner-container"}>{children}</div>
    </div>
  );
};

export default GeneralLayout;
