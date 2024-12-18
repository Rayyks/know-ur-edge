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
    getSinglePost: builder.query({
      query: (postId) => ({ url: `/posts/${postId}`, method: "GET" }),
    }),
    likePost: builder.mutation({
      query: (postId) => ({ url: `/likes/${postId}/like`, method: "POST" }),
    }),
    unLikePost: builder.mutation({
      query: (postId) => ({ url: `/likes/${postId}/unlike`, method: "POST" }),
    }),
    createPost: builder.mutation({
      query: (formData) => ({ url: "/posts", method: "POST", data: formData }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({ url: `/posts/${postId}`, method: "DELETE" }),
    }),
    editPost: builder.mutation({
      query: ({ postId, post }) => ({
        url: `/posts/${postId}`,
        method: "PUT",
        data: post,
      }),
    }),
    commentPost: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `/comments/${postId}/comment`,
        method: "POST",
        data: comment,
      }),
    }),
    replyComment: builder.mutation({
      query: ({ postId, parentCommentId, comment }) => ({
        url: `/comments/${postId}/comment`,
        method: "POST",
        data: { content: comment.content, parentCommentId },
      }),
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/comment/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFollowingFeedQuery,
  useGetRandomFeedQuery,
  useGetSinglePostQuery,
  useLikePostMutation,
  useUnLikePostMutation,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useCommentPostMutation,
  useReplyCommentMutation,
  useDeleteCommentMutation,
} = postApiSlice;
