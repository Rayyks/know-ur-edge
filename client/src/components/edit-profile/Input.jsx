import React from "react";

export const Input = React.forwardRef(({ type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      {...props}
      //   value={profile.username || "niger"}
      //   onChange={handleInputChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
});
