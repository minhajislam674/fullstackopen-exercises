import React from "react";

const ErrorMessage = ({ error }) => {
  return <div style={{ color: "red" }}>{error && <p>{error}</p>}</div>;
};

export default ErrorMessage;
