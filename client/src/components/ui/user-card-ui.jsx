import React from "react";
import { Link } from "react-router-dom";

export const UserCardUi = (user) => {
  return (
    <Link to={`/profile/${user?.username}`} key={user?._id}>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center space-x-4 mb-4">
        <img
          src={`http://localhost:5000${user?.avatar}`}
          alt={user?.username}
          className="w-16 h-16 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h3 className="text-lg font-semibold dark:text-gray-200">
            {user?.username}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>
    </Link>
  );
};
