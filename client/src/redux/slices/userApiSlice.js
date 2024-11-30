import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const userApiSlice = createApi({
  reducerPath: "userAPi",
  baseQuery: axiosBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAuthProfile: builder.query({
      query: () => ({ url: "/auth/profile", method: "GET" }),
    }),
    getSelectedUserProfile: builder.query({
      query: (username) => ({
        url: `/user/profile/${username}`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: "/auth/profile",
        method: "PUT",
        data: profile,
      }),
    }),
    requestAccountDeletion: builder.mutation({
      query: () => ({ url: "/user/account-deletion", method: "POST" }),
    }),
    cancelAccountDeletion: builder.mutation({
      query: () => ({ url: "/user/account-deletion", method: "DELETE" }),
    }),
  }),
});

export const {
  useGetAuthProfileQuery,
  useGetSelectedUserProfileQuery,
  useUpdateProfileMutation,
  useRequestAccountDeletionMutation,
  useCancelAccountDeletionMutation,
} = userApiSlice;
