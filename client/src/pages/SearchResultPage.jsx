import {
  Search,
  User,
  FileText,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
import { UserCardUi } from "@/components/ui/user-card-ui";
import { PostCardUi } from "@/components/ui/post-card-ui";
import useSearch from "@/hooks/useSearch";

const SearchResultPage = ({ query, onBack }) => {
  const { results, loading, error, activeTab, setActiveTab, users, posts } =
    useSearch(query);

  return (
    <div className="h-full w-full bg-gray-100 dark:bg-neutral-900 rounded-xl p-4 overflow-visible">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold dark:text-gray-200">
          Results for: "{query}"
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-white dark:bg-neutral-800 rounded-full p-1 shadow-sm">
        {[
          { value: "all", label: "All", icon: Search },
          { value: "users", label: "Users", icon: User },
          { value: "posts", label: "Posts", icon: FileText },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`
              flex-1 flex items-center justify-center py-2 rounded-full 
              transition-colors duration-300
              ${
                activeTab === tab.value
                  ? "bg-indigo-800 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            `}
          >
            <tab.icon className="mr-2" size={20} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading results...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <div className="h-full overflow-y-auto">
          {users.length === 0 && posts.length === 0 && (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No results found
            </div>
          )}
          {users.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 dark:text-gray-200 flex items-center">
                <User className="mr-2" /> Users
              </h3>
              {users.map(UserCardUi)}
            </div>
          )}
          {posts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 dark:text-gray-200 flex items-center">
                <FileText className="mr-2" /> Posts
              </h3>
              {posts.map(PostCardUi)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
