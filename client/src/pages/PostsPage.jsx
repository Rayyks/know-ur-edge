import { Link } from "react-router-dom";
import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import React from "react";

const PostsPage = () => {
  const posts = [
    {
      id: 1,
      author: "Harsh_C.",
      handle: "@harshc",
      verified: true,
      timeAgo: "2h",
      content: "Fintech 101: Exploring the Basics of Electronic Payments",
      image: "https://dummyjson.com/image/600x400/282828",
      likes: "2.4K",
      retweets: "1.2K",
      replies: "342",
      avatar: "/api/placeholder/48/48",
    },
    {
      id: 2,
      author: "John_D.",
      handle: "@johnd",
      verified: true,
      timeAgo: "4h",
      content:
        "From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech",
      image: "https://dummyjson.com/image/600x400/282828",
      likes: "3.1K",
      retweets: "1.8K",
      replies: "456",
      avatar: "/api/placeholder/48/48",
    },
    {
      id: 3,
      author: "Alexa_H.",
      handle: "@alexah",
      verified: true,
      timeAgo: "6h",
      content:
        "Fintech Solutions for Student Loans: Easing the Burden of Education Debt",
      image: "https://dummyjson.com/image/600x400/282828",
      likes: "4.2K",
      retweets: "2.5K",
      replies: "789",
      avatar: "/api/placeholder/48/48",
    },
  ];
  return (
    <div className="flex flex-1">
      {/* ACTUAL CONTENT */}
      <div className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start mb-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900 mr-2">
                          <Link to={`/profile/${post.author}`}>
                            {post.author}
                          </Link>
                        </span>
                        {/* VERIFIED ? */}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <span className="text-sm">{post.handle}</span>
                        <span className="mx-1">·</span>
                        <span className="text-sm">{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-900 mb-3">{post.content}</p>
                  <img
                    src={post.image}
                    alt="Post"
                    className="rounded-xl w-full mb-3"
                  />

                  {/* Actions */}
                  <div className="flex justify-between items-center text-gray-500 mt-4">
                    <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.replies}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-green-500 transition-colors duration-200">
                      <Repeat2 className="w-5 h-5" />
                      <span className="text-sm">{post.retweets}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-200">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200">
                      <Share className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SHOW MORE POSTS  */}
          <button className="mt-6 w-full py-3 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition-colors duration-200">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
