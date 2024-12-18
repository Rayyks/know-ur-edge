import {
  useGetFollowingFeedQuery,
  useGetRandomFeedQuery,
  useGetSinglePostQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} from "@/redux/slices/postApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const usePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const stringPostId = postId?.toString();

  const {
    data: followingFeed,
    error: followingfeedError,
    isLoading: isfollowingFeedLoading,
    refetch: refetchFollowingFeed,
  } = useGetFollowingFeedQuery();

  const {
    data: randomFeed,
    error: randomFeedError,
    isLoading: isRandomFeedLoading,
    refetch: refetchRandomFeed,
  } = useGetRandomFeedQuery();

  const {
    data: singlePost,
    error: singlePostError,
    isLoading: isSinglePostLoading,
    refetch: refetchSinglePost,
  } = useGetSinglePostQuery(stringPostId, {
    skip: !stringPostId,
  });

  // Mutations
  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Local State for Media
  const [media, setMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMedia(file); // Save the raw file
    }
  };

  const handleRemoveImage = () => setMedia(null);

  const handleCreatePost = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("category", data.category);
      if (media) {
        formData.append("media", media); // Attach the file
      }

      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await createPost(formData).unwrap();
      console.log("Post created successfully", data);
      reset();
      setMedia(null);
      setIsModalOpen(false);
      refetchRandomFeed();
      refetchFollowingFeed();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  // UNTUK LIMIT CONTENT DI POST LIST
  const limitContentByCharacters = (content, limit) => {
    if (content.length > limit) {
      return content.slice(0, limit) + "...";
    }
    return content;
  };

  // EDIT POST
  const [editPost, { isLoading: isEditing, error: editError }] =
    useEditPostMutation();

  const handleEditPost = async (postId, data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("category", data.category);
      if (media) {
        formData.append("media", media); // Attach the file
      }
      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await editPost({ postId, post: formData }).unwrap();
      console.log("Post created successfully", data);
      reset();
      setMedia(null);
      refetchRandomFeed();
      refetchFollowingFeed();
      refetchSinglePost();
      navigate(`/p/${postId}`);
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };

  // DELETE POST
  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId).unwrap();
      console.log("Post deleted successfully");
      refetchRandomFeed();
      refetchFollowingFeed();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return {
    limitContentByCharacters,
    postId,

    // GET RANDOM POSTS
    randomFeed,
    isRandomFeedLoading,
    randomFeedError,
    refetchRandomFeed,

    // GET FOLLOWING POST
    followingFeed,
    isfollowingFeedLoading,
    followingfeedError,
    refetchFollowingFeed,

    // GET SINGLE POST
    singlePost,
    isSinglePostLoading,
    singlePostError,
    refetchSinglePost,

    // CREATE POST
    register,
    handleSubmit,
    errors,
    isModalOpen,
    setIsModalOpen,
    media,
    setMedia,
    handleImageUpload,
    handleRemoveImage,
    handleCreatePost,
    isCreating,
    createError,

    // EDIT POST
    handleEditPost,
    isEditing,
    editError,

    // DELETE POST
    handleDeletePost,
  };
};

export default usePost;
