import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import usePost from "@/hooks/usePost";
import { CommentInput, SinglePostActions } from "@/components/post";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/formatDate";
import { getSafeImageUrl } from "@/lib/getSafeImageUrl";

const SinglePostPage = () => {
  const { singlePost, isSinglePostLoading, singlePostError } = usePost();
  const post = singlePost?.post;

  const navigate = useNavigate();

  // Utility function to handle image errors
  const handleImageError = (e) => {
    e.target.src = "/path/to/default-image.png";
    e.target.onerror = null;
  };

  if (isSinglePostLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 mx-auto bg-gray-300 dark:bg-neutral-700 rounded-full mb-4"></div>
          <p className="text-gray-500 dark:text-neutral-500">Loading post...</p>
        </div>
      </div>
    );

  if (singlePostError)
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-black text-center">
        <div>
          <p className="text-red-500 text-2xl mb-4">Something went wrong</p>
          <p className="text-gray-500">
            {singlePostError.message || "An unknown error occurred"}
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-black min-h-screen rounded-xl">
      {/* Post Header */}
      <div className="sticky top-0 rounded-t-xl bg-white/90 dark:bg-black/90 backdrop-blur-md z-10 border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center p-4">
          <button
            className="mr-4 text-black dark:text-white"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-black dark:text-white">Post</h2>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800 ">
        <div className="flex items-start space-x-3">
          <img
            src={
              getSafeImageUrl(post?.author?.profilePic) ||
              "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            }
            alt={post?.author?.username || "User"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 text-white">
            <div className="flex justify-between items-center mb-2 ">
              <div>
                <span className="font-bold ">
                  {post?.author?.username || "Unknown User"}
                </span>
                <span className="text-gray-500 dark:text-neutral-500 text-sm ml-2">
                  @{post?.author?.username || "username"}
                </span>
              </div>
              <button className="text-gray-500 hover:text-blue-500">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <h1 className="text-xl font-bold mb-2">
              {post?.title || "Untitled Post"}
            </h1>

            <p className="text-base mb-4">
              {post?.content || "No content available"}
            </p>

            {post?.media && (
              <img
                src={getSafeImageUrl(post.media)}
                alt=""
                className="max-w-full h-auto rounded-lg mb-4"
                onError={handleImageError}
              />
            )}

            <span className="text-sm text-gray-500 dark:text-neutral-500">
              {formatDate(post?.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Post Interactions */}
      <div className="flex justify-between p-4 border-b border-gray-200 dark:border-neutral-800 text-gray-500 dark:text-neutral-500">
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <MessageCircle className="w-5 h-5" />
          <span>{post?.comments?.length || 0}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <Repeat2 className="w-5 h-5" />
          <span>0</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-red-500">
          <Heart className="w-5 h-5" />
          <span>{post?.likes?.length || 0}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Comment Input */}
      <CommentInput post={post} getSafeImageUrl={getSafeImageUrl} />

      {/* Comments Section */}
      <div>
        {!post?.comments || post.comments.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-neutral-500 p-4">
            No Discussion yet
          </div>
        ) : (
          post.comments.map((comment, index) => (
            <SinglePostActions
              key={comment._id || index}
              comment={comment}
              getSafeImageUrl={getSafeImageUrl}
              post={post}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
