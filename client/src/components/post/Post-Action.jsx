import React, { useState, useEffect } from "react";
import { MessageCircle, Heart, Share } from "lucide-react";
import usePost from "@/hooks/usePost";

export const PostAction = ({ post, currentUserId }) => {
  const { handleLike, handleUnlike } = usePost();
  const [isLiked, setIsLiked] = useState(false); // Track like status
  const [likeCount, setLikeCount] = useState(0); // Track like count
  const [likeUserDetails, setLikeUserDetails] = useState([]); // Track like users

  console.log(likeUserDetails);

  useEffect(() => {
    if (post?.likes && Array.isArray(post.likes)) {
      setLikeCount(post.likes.length); // Set the like count
      setLikeUserDetails(post.likes); // Set the user details who liked the post
      // Check if the current user has liked the post
      const isUserLiked = post.likes.some((user) => user._id === currentUserId);
      setIsLiked(isUserLiked); // Set the like status based on the current user
    }
  }, [post, currentUserId]); // Run this effect whenever the post or currentUserId changes

  const toggleLike = async () => {
    try {
      // Optimistically update the UI
      if (isLiked) {
        setIsLiked(false); // Remove the like status immediately
        setLikeCount((prev) => Math.max(prev - 1, 0)); // Decrement likes immediately
        await handleUnlike(post._id); // Call the unlike API
      } else {
        setIsLiked(true); // Add the like status immediately
        setLikeCount((prev) => prev + 1); // Increment likes immediately
        await handleLike(post._id); // Call the like API
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // If there's an error, reset to the previous state
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (prev === 0 ? 0 : prev - 1)); // Reset like count if error occurs
    }
  };

  return (
    <div className="flex justify-between items-center border-t dark:border-neutral-600 pt-4">
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{post?.comments?.length || 0}</span>
        </button>
        <button
          className={`flex items-center space-x-2 ${
            isLiked
              ? "text-red-500 dark:text-red-400"
              : "text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          } transition-colors`}
          onClick={toggleLike}
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm">{likeCount}</span>
        </button>

        {/* Display the users who liked the post */}
        {likeUserDetails && likeUserDetails.length > 0 && (
          <div className="flex space-x-2">
            {likeUserDetails.slice(0, 3).map((user, index) => (
              <div key={index} className="flex items-center space-x-1">
                <img
                  src={`${import.meta.env.VITE_API_URL}${user.profilePic}`}
                  alt={user.username}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm">{user.username}</span>
              </div>
            ))}
            {likeUserDetails.length > 3 && (
              <span className="text-sm text-gray-500">
                +{likeUserDetails.length - 3} others
              </span>
            )}
          </div>
        )}
      </div>
      <button className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
        <Share className="w-5 h-5" />
      </button>
    </div>
  );
};
