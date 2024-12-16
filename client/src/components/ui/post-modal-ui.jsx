// Modal.jsx
import { XIcon } from "lucide-react";
import React from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75"
        >
          <XIcon size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
