const { getFollowingFeed } = require("../POSTCONTROLLER/getFeedController");
const { getRandomFeed } = require("../POSTCONTROLLER/getFeedController");
const { getSinglePost } = require("../POSTCONTROLLER/getSinglePostController");
const { createPost } = require("../POSTCONTROLLER/createPostController");
const { deletePost } = require("../POSTCONTROLLER/deletePostController");
const { updatePost } = require("../POSTCONTROLLER/updatePostController");
const { likePost, unlikePost } = require("./likeController");

module.exports = {
  getFollowingFeed,
  getRandomFeed,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
};
