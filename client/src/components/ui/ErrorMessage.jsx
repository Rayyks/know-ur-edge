import React from "react";

export const ErrorMessage = ({ message, details }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      {message && (
        <p className="mt-4 text-gray-600 dark:text-neutral-400">{message}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
