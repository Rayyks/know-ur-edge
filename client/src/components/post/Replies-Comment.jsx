import React from "react";
import { CommentDropdown } from "./Comment-Dropdown";
import { getSafeImageUrl } from "@/lib/getSafeImageUrl";
import { formatDate } from "@/lib/formatDate";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

export const RepliesComment = ({
  comment,
  showAnotherReplyInput,
  showAnotherReplies,
  toggleAnotherReplyInput,
  toggleAnotherReplies,
  register,
  handleSubmit,
  onSubmitAnotherReply,
  errors,
  isReplying,
}) => {
  return (
    <div className="mt-4 pl-4 border-l-2 border-neutral-700">
      {comment.replies.map((reply) => (
        <div
          key={reply?._id}
          className="mb-3 pb-3 border-b border-neutral-800 last:border-b-0"
        >
          <div className="flex items-start space-x-3">
            <img
              src={getSafeImageUrl(reply?.author?.profilePic)}
              alt={reply?.author?.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 text-white">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-bold text-xs">
                  @{reply?.author?.username}
                </span>

                {/* Check if reply has a parent comment */}
                {reply?.parentComment && (
                  <span className="text-xs text-gray-500 dark:text-neutral-500">
                    • replying to @
                    {reply?.parentComment?.author?.username || "unknown"}
                  </span>
                )}

                <span className="text-xs text-gray-500 dark:text-neutral-500">
                  • {formatDate(reply?.createdAt)}
                </span>
                <span className="text-xs text-gray-500 dark:text-neutral-500">
                  <CommentDropdown reply={reply} />
                </span>
              </div>
              <p className="text-xs">{reply?.content}</p>

              {/* ANOTHER REPLIES */}
              <div className="flex items-center space-x-8 text-gray-500 dark:text-neutral-500">
                {/* REPLIES COMMENTS COUNT */}
                <button
                  onClick={() => toggleAnotherReplyInput(reply._id)}
                  className="flex items-center space-x-1 hover:text-blue-500 text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{reply?.replies?.length || 0}</span>
                </button>

                {/* SHOW & HIDE ANOTHER REPLIES */}
                {reply?.replies?.length > 0 && (
                  <button
                    onClick={toggleAnotherReplies}
                    className="flex items-center space-x-1 hover:text-blue-500 text-xs"
                  >
                    {showAnotherReplies ? (
                      <span className="flex pl-3">
                        Hide Reply
                        <ChevronUp className="w-3 h-3 ml-1" />
                      </span>
                    ) : (
                      <span className="flex pl-3">
                        Show Reply ({reply?.replies?.length})
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </span>
                    )}
                  </button>
                )}
              </div>

              {/* SHOW ANOTHER REPLY INPUT */}
              {reply._id === showAnotherReplyInput && (
                <form
                  onSubmit={handleSubmit(onSubmitAnotherReply)}
                  className="mt-4"
                >
                  <div className="p-4 border-t border-neutral-800 flex space-x-3">
                    <img
                      src={getSafeImageUrl(reply?.author?.profilePic)}
                      alt={reply?.author?.username || "User"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <textarea
                        name="content"
                        placeholder="Write a reply..."
                        className="w-full p-2 text-base border-none focus:outline-none resize-none dark:bg-black dark:text-white"
                        {...register("content", {
                          required: "Reply is required",
                        })}
                        rows={3}
                      />
                      {errors.content && (
                        <p className="text-red-500 text-sm">
                          {errors.content.message}
                        </p>
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

              {/* ANOTHER REPLIES COMMENTS */}
              {showAnotherReplies && reply?.replies?.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-neutral-700">
                  {reply.replies.map((reply) => (
                    <div
                      key={reply?._id}
                      className="mb-3 pb-3 border-b border-neutral-800 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={getSafeImageUrl(reply?.author?.profilePic)}
                          alt={reply?.author?.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 text-white">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-bold text-xs">
                              @{reply?.author?.username}{" "}
                              {reply?.parentComment && (
                                <span className="text-xs text-gray-500 dark:text-neutral-500">
                                  • replying to @
                                  {reply?.parentComment?.author?.username}
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-neutral-500">
                              • {formatDate(reply?.createdAt)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-neutral-500">
                              <CommentDropdown reply={reply} />
                            </span>
                          </div>
                          <p className="text-xs">{reply?.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
