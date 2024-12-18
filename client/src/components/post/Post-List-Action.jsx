import React from "react";
import { MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const PostListAction = ({ post }) => {
  return (
    <div className="flex justify-between items-center border-t dark:border-neutral-600 pt-4 relative">
      {/* Interaction Counters */}
      <div className="flex space-x-4">
        <Link
          to={`/p/${post?._id}`}
          className="flex items-center space-x-2 
          text-neutral-500 dark:text-neutral-400 
          hover:text-blue-500 dark:hover:text-blue-400 
          transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{post?.comments.length || 0}</span>
        </Link>
        <button
          className="flex items-center space-x-2 
          text-neutral-500 dark:text-neutral-400 
          hover:text-red-500 dark:hover:text-red-400 
          transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm">{post?.likes.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default PostListAction;
