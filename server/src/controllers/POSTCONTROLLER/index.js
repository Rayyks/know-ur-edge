const {
  getFeed,
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

module.exports = {
  getFeed,
  createPost,
  deletePost,
  updatePost,
};
