import {
  useGetFollowingFeedQuery,
  useGetRandomFeedQuery,
  useLikePostMutation,
  useUnLikePostMutation,
  useCreatePostMutation,
} from "@/redux/slices/postApiSlice";

const usePost = () => {
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

  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostMutation();

  const handleCreatePost = async (post) => {
    try {
      await createPost(post).unwrap();
      refetch();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnLikePostMutation();

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      console.log("Like post:", postId);
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikePost(postId).unwrap();
      console.log("Post unliked!");
    } catch (err) {
      console.error("Failed to unlike post:", err);
    }
  };

  const limitContentByCharacters = (content, limit) => {
    if (content.length > limit) {
      return content.slice(0, limit) + "...";
    }
    return content;
  };

  return {
    limitContentByCharacters,

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

    // CREATE POST
    isCreating,
    createError,
    handleCreatePost,

    // POST ACTIONS
    handleLike,
    handleUnlike,
  };
};

export default usePost;
