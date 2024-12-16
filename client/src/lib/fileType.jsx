import PropTypes from "prop-types";

const isVideo = (post) => {
  if (
    !post ||
    !post.media ||
    !Array.isArray(post.media) ||
    post.media.length === 0
  ) {
    return false;
  }

  const videoExtensions = [".mp4", ".webm", ".ogg"];
  return videoExtensions.some((extension) => post.media[0].endsWith(extension));
};

isVideo.propTypes = {
  post: PropTypes.shape({
    media: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default isVideo;
