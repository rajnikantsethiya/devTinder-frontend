/* eslint-disable react/prop-types */
import React from "react";

const Toast = ({ data, handler }) => {
  const { status, message } = data;

  setTimeout(() => {
    handler(false);
  }, 3000); // Set timeout to 3 seconds
  return (
    <div className="toast toast-top toast-center">
      <div role="alert" className={`alert alert-${status}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
