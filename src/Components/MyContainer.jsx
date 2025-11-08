import React from "react";

const MyContainer = ({ children, className }) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};

export default MyContainer;
