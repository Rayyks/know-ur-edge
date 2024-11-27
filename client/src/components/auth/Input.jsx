import React from "react";

export const Input = React.forwardRef(({ type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      {...props}
      className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
    />
  );
});
