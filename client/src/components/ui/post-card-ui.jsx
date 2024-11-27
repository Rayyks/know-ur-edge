import React from "react";
import { Link } from "react-router-dom";

export const PostCardUi = (post) => {
  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div
      key={post?._id}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4"
    >
      <Link to={`/p/${post?._id}`} className="block mb-3">
        <h3 className="text-lg font-semibold dark:text-gray-200 mb-2">
          {post?.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {truncateContent(post?.content, 100)}
        </p>
        {post?.media && (
          <img
            src={`http://localhost:5000${post?.media}`}
            alt={post?.title}
            className="w-full h-48 object-cover rounded-md"
            loading="lazy"
          />
        )}
      </Link>
    </div>
  );
};
