import instance from "@/services/axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let errorResponse = {
        message: axiosError.message,
        status: axiosError.response?.status || null,
        statusText: axiosError.response?.statusText || "Unknown Error",
        data: axiosError.response?.data || null,
      };

      // Log detailed error
      console.error("Error details:", errorResponse);

      return { error: errorResponse };
    }
  };
