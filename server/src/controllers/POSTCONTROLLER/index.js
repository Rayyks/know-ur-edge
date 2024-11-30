const {
  getFollowingFeed,
} = require("../../controllers/POSTCONTROLLER/getFeedController");
const {
  getRandomFeed,
} = require("../../controllers/POSTCONTROLLER/getFeedController");
const {
  createPost,
} = require("../../controllers/POSTCONTROLLER/createPostController");
const {
  deletePost,
} = require("../../controllers/POSTCONTROLLER/deletePostController");
const {
  updatePost,
} = require("../../controllers/POSTCONTROLLER/updatePostController");
const { likePost, unlikePost } = require("./likeController");

module.exports = {
  getFollowingFeed,
  getRandomFeed,
  createPost,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
};
