export const getSafeImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return `${import.meta.env.VITE_API_URL}${imagePath}`.replace(
    /([^:]\/)\/+/g,
    "$1"
  );
};
