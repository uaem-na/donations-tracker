import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "query-string";
import { ApiModel, ApiResponse, MutationArgs, QueryArgs } from "./types";

const baseUrl = import.meta.env.VITE_API_URL || "";

// * Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    credentials: "include",
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "bracket" });
    },
  }),
  tagTypes: ["session", "posts", "users"],
  endpoints: (builder) => ({
    getSession: builder.query<ApiResponse.Session, void>({
      query: () => ({
        url: "auth/session",
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    login: builder.mutation<ApiResponse.Session, MutationArgs.Auth.Login>({
      query: ({ username, password }) => ({
        url: "auth/login",
        method: "POST",
        body: {
          username,
          password,
        },
      }),
      invalidatesTags: ["session"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["session"],
    }),
    register: builder.mutation<ApiResponse.Session, MutationArgs.Auth.Register>(
      {
        query: (data) => ({
          url: "auth/register",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["session"],
      }
    ),
    getStarredPosts: builder.query<
      ApiResponse.PaginatedList<ApiModel.Post>,
      QueryArgs.Users.GetStarredPosts
    >({
      query: ({ userId, ...rest }) => ({
        url: `users/${userId}/starred`,
        method: "GET",
        params: {
          ...rest,
        },
      }),
      transformResponse: (
        response: ApiResponse.PaginatedList<ApiModel.Post>
      ): ApiResponse.PaginatedList<ApiModel.Post> => {
        const posts = response.data;
        response.data = posts.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toLocaleDateString(),
          updatedAt: new Date(post.updatedAt).toLocaleDateString(),
          item: {
            ...post.item,
          },
          location: {
            ...post.location,
          },
        }));

        return response;
      },
      providesTags: (result, error, arg) => [
        { type: "session", id: "starred" },
      ],
    }),
    getPosts: builder.query<
      ApiResponse.PaginatedList<ApiModel.Post>,
      QueryArgs.Posts.GetPaginatedPosts
    >({
      query: (args) => ({
        url: "posts",
        method: "GET",
        params: { ...args },
      }),
      transformResponse: (
        response: ApiResponse.PaginatedList<ApiModel.Post>
      ): ApiResponse.PaginatedList<ApiModel.Post> => {
        const posts = response.data;
        response.data = posts.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toLocaleDateString(),
          updatedAt: new Date(post.updatedAt).toLocaleDateString(),
          item: {
            ...post.item,
          },
          location: {
            ...post.location,
          },
        }));

        return response;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "posts" as const, id })),
              { type: "posts", id: "list" },
            ]
          : [{ type: "posts", id: "list" }],
    }),
    getPostsForLandingPage: builder.query<
      ApiResponse.PaginatedList<ApiModel.Post>,
      void
    >({
      query: () => ({
        url: "posts/landing",
        method: "GET",
      }),
      transformResponse: (
        response: ApiResponse.PaginatedList<ApiModel.Post>
      ): ApiResponse.PaginatedList<ApiModel.Post> => {
        const posts = response.data;
        response.data = posts.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toLocaleDateString(),
          updatedAt: new Date(post.updatedAt).toLocaleDateString(),
          item: {
            ...post.item,
          },
          location: {
            ...post.location,
          },
        }));

        return response;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "posts" as const, id })),
              { type: "posts", id: "landing-list" },
            ]
          : [{ type: "posts", id: "landing-list" }],
    }),
    getPost: builder.query<ApiModel.Post, QueryArgs.Posts.GetPost>({
      query: ({ postId }) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: "posts", id: arg.postId }],
    }),
    createPost: builder.mutation<unknown, QueryArgs.Posts.CreatePost>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: "list" }],
    }),
    editPost: builder.mutation<unknown, QueryArgs.Posts.EditPost>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: arg.id }],
    }),
    deletePost: builder.mutation<unknown, QueryArgs.Posts.DeletePost>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: arg.id }],
    }),
    getItemCategories: builder.query<
      ApiModel.PostItemCategory[],
      QueryArgs.Posts.GetAvailableItemCategories
    >({
      query: ({ locale }) => ({
        url: `posts/items/categories`,
        method: "GET",
        params: { locale },
      }),
      providesTags: (result, error, arg) => [
        { type: "posts", id: "categories" },
      ],
    }),
    starPost: builder.mutation<boolean, QueryArgs.Posts.StarPost>({
      query: ({ id }) => ({
        url: `posts/${id}/star`,
        method: "POST",
      }),
      invalidatesTags: ["session"],
    }),
    getUser: builder.query<ApiModel.User, QueryArgs.Users.GetUser>({
      query: ({ userId }) => ({ url: `users/${userId}`, method: "GET" }),
      providesTags: (result, error, args) => [
        { type: "users", id: args.userId },
      ],
    }),
    getUsers: builder.query<ApiModel.User[], void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "users" as const, id })),
              { type: "users", id: "list" },
            ]
          : [{ type: "users", id: "list" }],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "users/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [{ type: "users", id }],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "users/password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [{ type: "users", id }],
    }),
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: "users/delete",
        method: "DELETE",
        params: { userId },
      }),
      invalidatesTags: (result, error, id) => [{ type: "users", id }],
    }),
    verifyUser: builder.mutation({
      query: ({ userId }) => ({
        url: "users/verify",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: (result, error, id) => [{ type: "users", id }],
    }),
    setUserActive: builder.mutation<
      ApiModel.User,
      MutationArgs.Users.SetUserActive
    >({
      query: ({ userId, active }) => ({
        url: `users/${userId}/active`,
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
  useCreatePostMutation,
  useDeletePostMutation,
  useDeleteUserMutation,
  useEditPostMutation,
  useGetItemCategoriesQuery,
  useGetPostQuery,
  useGetPostsQuery,
  useGetPostsForLandingPageQuery,
  useGetSessionQuery,
  useGetStarredPostsQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useLazyGetPostQuery,
  useLazyGetSessionQuery,
  useLazyGetStarredPostsQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSetUserActiveMutation,
  useStarPostMutation,
  useUpdateUserMutation,
  useVerifyUserMutation,
} = api;

export * from "./types";
