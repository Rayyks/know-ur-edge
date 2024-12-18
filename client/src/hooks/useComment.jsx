import { useForm } from "react-hook-form";
import {
  useCommentPostMutation,
  useReplyCommentMutation,
  useDeleteCommentMutation,
} from "@/redux/slices/postApiSlice";
import usePost from "@/hooks/usePost";

const useComment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { refetchSinglePost } = usePost();

  const [createComment, { isLoading: isCreating, error: createError }] =
    useCommentPostMutation();

  const handlePostComment = async (postId, data) => {
    try {
      await createComment({ postId, comment: data }).unwrap();
      reset();
      refetchSinglePost();
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const [replyComment, { isLoading: isReplying, error: replyError }] =
    useReplyCommentMutation();

  const handleReplyComment = async (postId, parentCommentId, content) => {
    try {
      await replyComment({
        postId,
        parentCommentId,
        comment: { content, parentCommentId },
      }).unwrap();
      reset();
      refetchSinglePost();
    } catch (error) {
      console.error("Failed to reply to comment:", error);
    }
  };

  const [deleteComment, { isLoading: isDeleting, error: deleteError }] =
    useDeleteCommentMutation();

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId).unwrap();
      refetchSinglePost();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    errors,
    // CREATE
    createComment,
    isCreating,
    createError,
    handlePostComment,
    // REPLY
    replyComment,
    isReplying,
    replyError,
    handleReplyComment,
    // DELETE
    deleteComment,
    isDeleting,
    deleteError,
    handleDeleteComment,
  };
};

export default useComment;
