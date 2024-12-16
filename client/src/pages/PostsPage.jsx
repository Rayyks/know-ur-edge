import { Code, Terminal } from "lucide-react";
import usePost from "@/hooks/usePost";
import { PostHeader, PostBody, PostListAction } from "@/components/post";
import CreatePost from "@/components/post/Create-Post";
import { PostDropdown } from "@/components/post/Post-Dropdown";

const PostsPage = () => {
  const {
    randomFeed,
    isRandomFeedLoading,
    randomFeedError,
    limitContentByCharacters,
  } = usePost();

  if (isRandomFeedLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="flex items-center space-x-3 animate-pulse">
          <Terminal className="w-10 h-10 text-blue-600" />
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Loading feed...
          </p>
        </div>
      </div>
    );

  if (randomFeedError)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="text-center">
          <Code className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <p className="text-2xl font-semibold text-red-700 dark:text-red-400">
            Oops! Something went wrong
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {randomFeedError.message}
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Terminal className="w-8 h-8 mr-3 text-blue-600" />
            Random Knowledge Feed
          </h1>
          <div className="flex space-x-2">
            <CreatePost />
          </div>
        </div>

        <div className="space-y-6">
          {randomFeed?.posts.map((post) => (
            <div
              key={post?._id}
              className="bg-white dark:bg-neutral-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-neutral-600 overflow-hidden"
            >
              <div className="p-6">
                {/* DROPDOWN */}
                <PostDropdown post={post} />

                {/* Header */}
                <PostHeader post={post} />

                {/* Content */}
                <PostBody
                  post={post}
                  limitContentByCharacters={limitContentByCharacters}
                />

                {/* Actions */}
                <PostListAction post={post} />
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto space-x-2">
            <Terminal className="w-5 h-5" />
            <span>Load More Posts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
