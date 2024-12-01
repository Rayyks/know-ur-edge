import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const userApiSlice = createApi({
  reducerPath: "userApi", // Fixed typo here (userAPi -> userApi)
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
    updateExperience: builder.mutation({
      query: (experience) => ({
        url: "/auth/profile/experience",
        method: "PUT",
        data: experience,
      }),
    }),
    updateSkills: builder.mutation({
      query: (skills) => ({
        url: "/auth/profile/skills",
        method: "PUT",
        data: skills,
      }),
    }),
    updateProjects: builder.mutation({
      query: (projects) => ({
        url: "/auth/profile/projects",
        method: "PUT",
        data: projects,
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
  useUpdateExperienceMutation,
  useUpdateSkillsMutation,
  useUpdateProjectsMutation,
  useRequestAccountDeletionMutation,
  useCancelAccountDeletionMutation,
} = userApiSlice;
