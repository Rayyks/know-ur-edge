import instance from "@/services/axios";

export const getFeedAPI = async () => {
  try {
    const response = await instance.get("/api/posts/feed");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPostAPI = async (post) => {
  try {
    const response = await instance.post("/api/posts", post);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
