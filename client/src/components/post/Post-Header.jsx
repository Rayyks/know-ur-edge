import { Link } from "react-router-dom";
import { Code } from "lucide-react";
export const PostHeader = ({ post }) => {
  return (
    <Link to={`/profile/`} className="flex items-center mb-4">
      <img
        src={`${import.meta.env.VITE_API_URL}${post?.author?.profilePic}`}
        alt={"User"}
        className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-100 dark:border-neutral-600"
      />
      <div>
        <span className="font-bold text-gray-900 dark:text-white text-lg hover:text-indigo-300">
          @{post?.author?.username}
        </span>
        <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
          <Code className="w-4 h-4 mr-2 text-blue-500" />
          {post?.category}
        </div>
      </div>
    </Link>
  );
};

export default PostHeader;
