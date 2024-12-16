import isVideo from "@/lib/fileType";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const PostBody = ({ post, limitContentByCharacters }) => {
  const mediaUrl = `${import.meta.env.VITE_API_URL}${post?.media[0]}`;

  return (
    <Fragment>
      <Link to={`/p/${post?._id}`} className="block mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post?.title}
        </h2>
      </Link>

      <p className="text-gray-700 dark:text-gray-300 mb-4 bg-neutral-800 p-3 rounded-xl">
        {limitContentByCharacters(post?.content, 200)}
      </p>

      {post?.media &&
        (isVideo(post) ? (
          <video
            src={mediaUrl}
            controls
            className="w-full rounded-xl mb-4 object-cover max-h-96"
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Post"
            className="w-full rounded-xl mb-4 object-cover max-h-96"
          />
        ))}
    </Fragment>
  );
};

export default PostBody;
