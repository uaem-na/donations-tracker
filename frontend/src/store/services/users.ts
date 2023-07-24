// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "";

// * Define args and result types for query
export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  active: boolean;
};

type GetUserArgs = {
  userId: string;
};

type SetUserActiveArgs = {
  userId: string;
  active: boolean;
};

// * Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/users`,
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUser: builder.query<User, GetUserArgs>({
      query: ({ userId }) => ({ url: `${userId}`, method: "GET" }),
      providesTags: (result, error, args) => [
        { type: "users" as const, id: args.userId },
      ],
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "users" as const, id })),
              { type: "users", id: "LIST" },
            ]
          : [{ type: "users", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [{ type: "users", id }],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [{ type: "users", id }],
    }),
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: "delete",
        method: "DELETE",
        params: { userId },
      }),
      invalidatesTags: (result, error, id) => [{ type: "users", id }],
    }),
    verifyUser: builder.mutation({
      query: ({ userId }) => ({
        url: "verify",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: (result, error, id) => [{ type: "users", id }],
    }),
    setUserActive: builder.mutation<User, SetUserActiveArgs>({
      query: ({ userId, active }) => ({
        url: `${userId}/active`,
        method: "PUT",
        body: { active },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "users", id: userId },
      ],
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
  useSetUserActiveMutation,
} = usersApi;
