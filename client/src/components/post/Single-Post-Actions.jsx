import React from "react";
import { formatDate } from "@/lib/formatDate";
import { CommentDropdown } from "./Comment-Dropdown";
import useComment from "@/hooks/useComment";
import { CommentReplies } from "./Comment-Replies";

export const SinglePostActions = ({ comment, post, getSafeImageUrl }) => {
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
              • {formatDate(comment?.createdAt)}
            </span>
            <span className="text-xs text-gray-500 dark:text-neutral-500">
              <CommentDropdown comment={comment} />
            </span>
          </div>

          <p className="text-sm mb-2">{comment?.content}</p>

          <CommentReplies
            comment={comment}
            post={post}
            getSafeImageUrl={getSafeImageUrl}
          />
        </div>
      </div>
    </div>
  );
};
export const CommentInput = ({ getSafeImageUrl, post }) => {
  const { register, handleSubmit, errors, handlePostComment, isCreating } =
    useComment();

  const onSubmit = (data) => {
    handlePostComment(post?._id, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex space-x-3">
        <img
          src={getSafeImageUrl(post?.author?.profilePic)}
          alt={post?.author?.username || "User"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            {...register("content", { required: "Comment is required" })}
            placeholder="Discuss About This Post"
            className="w-full p-2 text-base border-none focus:outline-none resize-none dark:bg-black dark:text-white"
            rows={3}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isCreating}
              className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-600 disabled:opacity-50"
            >
              {isCreating ? "Submitting..." : "Submit Discussion"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SinglePostActions;
