import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const postApiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getFollowingFeed: builder.query({
      query: () => ({ url: "/posts/following-feed", method: "GET" }),
    }),
    getRandomFeed: builder.query({
      query: () => ({ url: "/posts/random-feed", method: "GET" }),
    }),
    likePost: builder.mutation({
      query: (postId) => ({ url: `/likes/${postId}/like`, method: "POST" }),
    }),
    unLikePost: builder.mutation({
      query: (postId) => ({ url: `/likes/${postId}/unlike`, method: "POST" }),
    }),
    createPost: builder.mutation({
      query: (post) => ({ url: "/posts", method: "POST", data: post }),
    }),
  }),
});

export const {
  useGetFollowingFeedQuery,
  useGetRandomFeedQuery,
  useLikePostMutation,
  useUnLikePostMutation,
  useCreatePostMutation,
} = postApiSlice;
