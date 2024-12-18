import React, { useState, Fragment } from "react";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

import useComment from "@/hooks/useComment";
import { RepliesComment } from "./Replies-Comment";

export const CommentReplies = ({ comment, post, getSafeImageUrl }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showAnotherReplyInput, setShowAnotherReplyInput] = useState(null);
  const [showAnotherReplies, setShowAnotherReplies] = useState(false);

  const { register, handleSubmit, errors, handleReplyComment, isReplying } =
    useComment();

  const toggleReplies = () => setShowReplies(!showReplies);
  const toggleAnotherReplies = () => setShowAnotherReplies(!showAnotherReplies);
  const toggleReplyInput = () => setShowReplyInput(!showReplyInput);
  const toggleAnotherReplyInput = (id) =>
    setShowAnotherReplyInput(showAnotherReplyInput === id ? null : id);

  const onSubmitReply = async (data) => {
    await handleReplyComment(post?._id, comment?._id, data.content);
    setShowReplyInput(false);
    setShowAnotherReplyInput(null);
  };

  const onSubmitAnotherReply = async (data) => {
    await handleReplyComment(post?._id, showAnotherReplyInput, data.content);
    setShowAnotherReplyInput(null);
  };

  return (
    <Fragment>
      <div className="flex items-center space-x-8 text-gray-500 dark:text-neutral-500">
        {/* COMMENTS */}
        <button
          onClick={toggleReplyInput}
          className="flex items-center space-x-1 hover:text-blue-500 text-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{comment?.replies?.length || 0}</span>
        </button>

        {/* REPLIES */}
        {comment?.replies?.length > 0 && (
          <button
            onClick={toggleReplies}
            className="flex items-center space-x-1 hover:text-blue-500 text-xs"
          >
            {showReplies ? (
              <span className="flex pl-3">
                Hide Reply
                <ChevronUp className="w-3 h-3 ml-1" />
              </span>
            ) : (
              <span className="flex pl-3">
                Show Reply ({comment?.replies?.length})
                <ChevronDown className="w-3 h-3 ml-1" />
              </span>
            )}
          </button>
        )}
      </div>

      {showReplyInput && (
        <form onSubmit={handleSubmit(onSubmitReply)} className="mt-4">
          <div className="p-4 border-t border-neutral-800 flex space-x-3">
            <img
              src={getSafeImageUrl(post?.author?.profilePic)}
              alt={post?.author?.username || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                {...register("content", { required: "Reply is required" })}
                placeholder="Write a reply..."
                className="w-full p-2 text-base border-none focus:outline-none resize-none dark:bg-black dark:text-white"
                rows={3}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isReplying}
                  className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-600 disabled:opacity-50"
                >
                  {isReplying ? "Submitting..." : "Submit Reply"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {showReplies && comment?.replies?.length > 0 && (
        <RepliesComment
          comment={comment}
          post={post}
          showAnotherReplies={showAnotherReplies}
          showAnotherReplyInput={showAnotherReplyInput}
          toggleAnotherReplyInput={toggleAnotherReplyInput}
          toggleAnotherReplies={toggleAnotherReplies}
          // FOR INPUT REPLY
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmitAnotherReply={onSubmitAnotherReply}
          isReplying={isReplying}
        />
      )}
    </Fragment>
  );
};
