import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GuestWrapper = ({ children, restrictedActions }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated && restrictedActions) {
    return (
      <div className="text-center">
        <p className="text-gray-700">
          You must be logged in to perform this action.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 text-white px-4 py-2 mt-4 rounded"
        >
          Log in
        </button>
      </div>
    );
  }

  return children;
};

export default GuestWrapper;
