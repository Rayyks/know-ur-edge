import { Fragment } from "react";
import { ImageIcon, XIcon } from "lucide-react";
import { Modal } from "@/components/ui";
import usePost from "@/hooks/usePost";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    errors,
    media,
    isModalOpen,
    isCreating,
    setIsModalOpen,
    handleImageUpload,
    handleRemoveImage,
    handleCreatePost,
  } = usePost();

  return (
    <Fragment>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-600"
      >
        Create Post
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-w-2xl mx-auto bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-neutral-800">
          <form
            onSubmit={handleSubmit((data) =>
              handleCreatePost({ ...data, media })
            )}
          >
            {/* Post Title Input */}
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}

            {/* Post Content Input */}
            <textarea
              placeholder="What's happening?"
              className="w-full min-h-[100px] resize-none focus:outline-none text-lg dark:bg-black dark:text-white placeholder-gray-500 mb-4 p-2 border border-gray-300 rounded-lg"
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}

            {/* Post Category Input */}
            <input
              type="text"
              placeholder="Category"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}

            {/* Media Preview */}
            {media && (
              <div className="relative mt-4">
                <img
                  src={URL.createObjectURL(media)}
                  alt="Selected"
                  className="max-w-full h-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75"
                >
                  <XIcon size={20} />
                </button>
              </div>
            )}

            {/* Media Upload */}
            <label className="cursor-pointer hover:bg-blue-50 rounded-full p-2 mt-4 flex items-center space-x-2">
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  handleImageUpload;
                }}
              />
              <ImageIcon className="text-blue-500" />
              <span>Upload Media</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCreating}
              className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-600 mt-4 w-full disabled:opacity-50"
            >
              {isCreating ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CreatePost;
