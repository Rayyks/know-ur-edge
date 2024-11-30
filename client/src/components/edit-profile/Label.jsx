import React from "react";

export const Label = React.forwardRef(({ children }, ref) => {
  return (
    <label ref={ref} className="block text-gray-700 font-medium mb-2">
      {children}
    </label>
  );
});
