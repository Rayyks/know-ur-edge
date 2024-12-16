import React, { useState } from "react";
import { ImageIcon, XIcon, ChevronDownIcon } from "lucide-react";
import usePost from "@/hooks/usePost";

const EditPost = () => {
  const {
    singlePost,
    isSinglePostLoading,
    register,
    handleSubmit,
    errors,
    media,
    isEditing,
    editError,
    handleImageUpload,
    handleRemoveImage,
    handleEditPost,
  } = usePost();
  const getPostId = singlePost?.post?._id;
  console.log(getPostId);

  if (isSinglePostLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 mx-auto bg-gray-300 dark:bg-neutral-700 rounded-full mb-4"></div>
          <p className="text-gray-500 dark:text-neutral-500">Loading post...</p>
        </div>
      </div>
    );

  if (editError) {
    return (
      <div className="max-w-xl h-screen mx-auto p-4 flex items-center justify-center">
        <p className="text-red-500 text-lg">{editError} JHOKHOWHY ANJHENG</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl h-screen mx-auto p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Edit Post
          </h2>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleEditPost(getPostId, data))}
          className="p-6 space-y-6"
        >
          {/* Post Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              defaultValue={singlePost?.post?.title}
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg 
              bg-white dark:bg-neutral-800 text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-300 ease-in-out"
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 100,
                  message: "Title must be less than 100 characters",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Post Content Input */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              defaultValue={singlePost?.post?.content}
              className="w-full min-h-[150px] p-3 border border-gray-300 dark:border-neutral-700 rounded-lg
              bg-white dark:bg-neutral-800 text-gray-900 dark:text-white
              resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-300 ease-in-out"
              {...register("content", {
                required: "Content is required",
                maxLength: {
                  value: 1000,
                  message: "Content must be less than 1000 characters",
                },
              })}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Category
            </label>
            <input
              id="title"
              type="text"
              defaultValue={singlePost?.post?.category}
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg 
              bg-white dark:bg-neutral-800 text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-300 ease-in-out"
              {...register("category", {
                required: "Category is required",
                maxLength: {
                  value: 100,
                  message: "Category must be less than 100 characters",
                },
              })}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Upload Image
            </label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center space-x-2 
                bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg 
                hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <ImageIcon className="text-blue-500 w-5 h-5" />
                <span className="text-blue-600 dark:text-blue-300">
                  Choose Image
                </span>
              </label>
              {media && (
                <div className="relative">
                  <img
                    src={media}
                    alt="Selected"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500/80 text-white rounded-full p-1 
                    hover:bg-red-600 transition-colors"
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isEditing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg 
            font-semibold hover:opacity-90 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed 
            flex items-center justify-center space-x-2"
          >
            {isEditing ? (
              <>
                <span>Editing...</span>
                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
              </>
            ) : (
              "Edit Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
