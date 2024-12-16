import { MessageCircle, Heart } from "lucide-react";
import React, { useState } from "react";

export const SinglePostActions = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    // Implement reply logic
    console.log("Reply submitted:", replyText);
    setIsReplying(false);
    setReplyText("");
  };

  return (
    <div className="border-b border-neutral-800 py-4 px-4 hover:bg-neutral-900 transition-colors">
      <div className="flex items-start space-x-3">
        <img
          src={`${import.meta.env.VITE_API_URL}${comment?.author?.profilePic}`}
          alt={comment?.author?.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 text-white">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-bold text-sm">
              @{comment?.author?.username}
            </span>
            <span className="text-xs text-gray-500 dark:text-neutral-500">
              • {comment?.createdAt}
            </span>
          </div>

          <p className="text-sm mb-2">{comment?.content}</p>

          <div className="flex items-center space-x-8 text-gray-500 dark:text-neutral-500">
            <button className="flex items-center space-x-1 hover:text-blue-500 text-xs">
              <MessageCircle className="w-4 h-4" />
              <span>{comment?.replies?.length || 0}</span>
            </button>

            <button className="flex items-center space-x-1 hover:text-red-500 text-xs">
              <Heart className="w-4 h-4" />
              <span>{comment?.likes?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostActions;

export const CommentInput = ({ getSafeImageUrl, post, handleImageError }) => {
  const handlePostComment = () => {
    console.log("Posting comment:", commentText);
    setCommentText("");
  };

  const [commentText, setCommentText] = useState("");

  return (
    <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex space-x-3">
      <img
        src={getSafeImageUrl(post?.author?.profilePic)}
        alt={post?.author?.username || "User"}
        className="w-10 h-10 rounded-full object-cover"
        onError={handleImageError}
      />
      <div className="flex-1">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Disscuss About This Post"
          className="w-full p-2 text-base border-none focus:outline-none resize-none dark:bg-black dark:text-white"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handlePostComment}
            className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-600 disabled:opacity-50"
            disabled={!commentText.trim()}
          >
            Submit Discussion
          </button>
        </div>
      </div>
    </div>
  );
};
