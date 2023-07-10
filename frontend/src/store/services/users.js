// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "";

// * Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/users`,
    withCredentials: true,
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ userId }) => ({ url: `${userId}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "users", id }],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "users", id: "list" }],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "POST",
        body: data,
      }),
      providesTags: (result, error, id) => [{ type: "users", id }],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "password",
        method: "POST",
        body: data,
      }),
      providesTags: (result, error, id) => [{ type: "users", id }],
    }),
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: "delete",
        method: "DELETE",
        params: { userId },
      }),
      providesTags: (result, error, id) => [{ type: "users", id }],
    }),
    verifyUser: builder.mutation({
      query: ({ userId }) => ({
        url: "verify",
        method: "POST",
        body: { userId },
      }),
      providesTags: (result, error, id) => [{ type: "users", id }],
    }),
  }),
});

// * Export hooks for usage in functional components, which are
// * auto-generated based on the defined endpoints
export const {
  useChangePasswordMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useVerifyUserMutation,
} = usersApi;
