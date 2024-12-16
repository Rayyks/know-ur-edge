import React, { useEffect, useRef } from "react";

export const DropdownMenu = ({ children, isOpen, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-neutral-800 
          border border-neutral-200 dark:border-neutral-700 
          rounded-lg shadow-lg z-50 overflow-hidden"
    >
      {children}
    </div>
  ) : null;
};

// Dropdown Menu Item
export const DropdownMenuItem = ({
  icon: Icon,
  children,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm 
      text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 
      transition-colors ${className}`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    <span>{children}</span>
  </button>
);
