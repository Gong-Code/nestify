import React from "react";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default PublicLayout;
