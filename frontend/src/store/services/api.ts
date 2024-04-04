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
  tagTypes: ["session", "posts", "users", "reports", "reported-posts"],
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
        response.data = posts?.map((post) => ({
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
    getUserPosts: builder.query<
      ApiResponse.PaginatedList<ApiModel.Post>,
      QueryArgs.Posts.GetUserPosts
    >({
      query: ({ userId, ...args }) => ({
        url: `posts/user/${userId}`,
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
      providesTags: (result, error, arg) => [
        { type: "session", id: "my_posts" },
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
    toggleUserActiveAdmin: builder.mutation<
      ApiModel.User,
      MutationArgs.Users.ToggleUserActive
    >({
      query: ({ userId }) => ({
        url: `admin/users/${userId}/active`,
        method: "PUT",
        body: { userId },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "users", id: userId },
      ],
    }),
    getPostsAdmin: builder.query<
      ApiResponse.PaginatedList<ApiModel.Post>,
      QueryArgs.Posts.GetPaginatedPosts
    >({
      query: (args) => ({
        url: "admin/posts",
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
            { type: "posts", id: "admin-list" },
          ]
          : [{ type: "posts", id: "admin-list" }],
    }),
    approvePostAdmin: builder.mutation<
      ApiResponse.MessageResponse,
      MutationArgs.Posts.ApprovePost
    >({
      query: ({ postId }) => ({
        url: `admin/posts/${postId}/approve`,
        method: "PUT",
        body: { postId },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "posts", id: args.postId },
      ],
    }),
    rejectPostAdmin: builder.mutation<
      ApiResponse.MessageResponse,
      MutationArgs.Posts.RejectPost
    >({
      query: ({ postId }) => ({
        url: `admin/posts/${postId}/reject`,
        method: "PUT",
        body: { postId },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "posts", id: args.postId },
      ],
    }),
    getUsersAdmin: builder.query<
      ApiResponse.PaginatedList<ApiModel.User>,
      QueryArgs.Users.GetPaginatedUsers
    >({
      query: (args) => ({
        url: "admin/users",
        method: "GET",
        params: { ...args },
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: "users" as const, id })),
            { type: "users", id: "admin-list" },
          ]
          : [{ type: "users", id: "admin-list" }],
    }),
    getUserAdmin: builder.query<ApiModel.User, QueryArgs.Users.GetUser>({
      query: ({ userId }) => ({ url: `admin/users/${userId}`, method: "GET" }),
      providesTags: (result, error, args) => [
        { type: "users", id: args.userId },
      ],
    }),
    verifyUserAdmin: builder.mutation<
      ApiResponse.MessageResponse,
      MutationArgs.Users.VerifyUser
    >({
      query: ({ userId }) => ({
        url: `admin/users/${userId}/verify`,
        method: "PUT",
        body: { userId },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "users", id: args.userId },
      ],
    }),
    getReportedPost: builder.query<
      ApiModel.Report[],
      QueryArgs.Reports.ReportedPost
    >({
      query: ({ postId }) => ({
        url: `reports/post/${postId}`,
        method: "GET",
      }),
      providesTags: (result): any =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "reports" as const, id })),
            { type: "reports", id: "reports-list" },
          ]
          : [{ type: "reports", id: "reports-list" }],
    }),
    getReportedPosts: builder.query<
      ApiResponse.PaginatedList<{
        id: string;
        outstanding_reports: number;
        post: ApiModel.Post;
      }>,
      QueryArgs.Reports.GetPaginatedReportedPosts
    >({
      query: (args) => ({
        url: "reports",
        method: "GET",
        params: { ...args },
      }),
      providesTags: (result, error, args): any[] =>
        result
          ? [
            ...result.data?.map(({ id }) => ({
              type: "reported-posts" as const,
              id,
            })),
            { type: "reported-posts", id: "reported-posts-list" },
          ]
          : [{ type: "reported-posts", id: "reported-posts-list" }],
    }),
    reportPost: builder.mutation<unknown, MutationArgs.Reports.CreateReport>({
      query: ({ postId, notes }) => ({
        url: `reports`,
        method: "POST",
        body: { postId, notes },
      }),
      invalidatesTags: (result, error, args): any => [
        { type: "reported-posts", id: args.postId },
      ],
    }),
    updateReportPost: builder.mutation<
      unknown,
      MutationArgs.Reports.UpdateReport
    >({
      query: ({ id, status }) => ({
        url: `reports/${id}`,
        method: "POST",
        body: { id, status },
      }),
      invalidatesTags: (result, error, args): any => [
        { type: "reports", id: args.id },
        { type: "reports", id: "reports-list" },
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
  useGetUserPostsQuery,
  useGetUsersQuery,
  useLazyGetPostQuery,
  useLazyGetSessionQuery,
  useLazyGetStarredPostsQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useToggleUserActiveAdminMutation,
  useStarPostMutation,
  useUpdateUserMutation,
  useVerifyUserAdminMutation,
  useGetUserAdminQuery,
  useGetUsersAdminQuery,
  useGetPostsAdminQuery,
  useApprovePostAdminMutation,
  useRejectPostAdminMutation,
  useGetReportedPostQuery,
  useGetReportedPostsQuery,
  useReportPostMutation,
  useUpdateReportPostMutation,
} = api;

export * from "./types";
