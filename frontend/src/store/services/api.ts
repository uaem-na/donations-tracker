import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "";

// * Define API response types
type Session = {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  starred: string[]; // post ids
};

export type PostAuthorApiResponse = {
  firstName: string;
  id: string;
  lastName: string;
  email: string;
};

export type PostApiResponse = {
  author: PostAuthorApiResponse;
  createdAt: string;
  id: string;
  item: PostItemApiResponse;
  location: PostLocationApiResponse;
  status: "request" | "offer";
  type: string;
  updatedAt: string;
  views: number;
};

export type PostLocationApiResponse = {
  lat?: number;
  lng?: number;
  postalCode?: string;
  id: string;
};

export type PostItemApiResponse = {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  id: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  active: boolean;
  starred: PostApiResponse[];
};

type PaginatedListResponse<T> = {
  data: T[];
  total: number;
  page: number;
  per_page: number;
};

// * Define args
type PaginationArgs = {
  per_page: number;
  page: number;
};

type FilterByPostTypeArgs = {
  type: "all" | "request" | "offer";
};

type FilterByPostStatusArgs = {
  status?: "all" | "open" | "closed";
};

type GetUserArgs = {
  userId: string;
};

type LoginArgs = {
  username: string;
  password: string;
};

type GetPostArgs = {
  postId: string;
};

type CreatePostArgs = Omit<
  PostApiResponse,
  | "id"
  | "author"
  | "createdAt"
  | "updatedAt"
  | "views"
  | "location"
  | "item"
  | "status"
> & {
  location: Omit<PostLocationApiResponse, "id">;
  item: Omit<PostItemApiResponse, "id">[];
  id?: string; // * for edit
};

type EditPostArgs = Omit<CreatePostArgs, "type">;

type DeletePostArgs = Pick<PostApiResponse, "id">;

type StarPostArgs = Pick<PostApiResponse, "id">;

type SetUserActiveArgs = {
  userId: string;
  active: boolean;
};

// * Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    credentials: "include",
  }),
  tagTypes: ["session", "posts", "users"],
  endpoints: (builder) => ({
    getSession: builder.query<Session, void>({
      query: () => ({
        url: "auth/session",
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    login: builder.mutation<Session, LoginArgs>({
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
    register: builder.mutation<Session, unknown>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["session"],
    }),
    getStarredPosts: builder.query<
      PaginatedListResponse<PostApiResponse>,
      GetUserArgs & PaginationArgs & FilterByPostTypeArgs
    >({
      query: ({ userId, ...rest }) => ({
        url: `users/${userId}/starred`,
        method: "GET",
        params: { ...rest },
      }),
      transformResponse: (
        response: PaginatedListResponse<PostApiResponse>
      ): PaginatedListResponse<PostApiResponse> => {
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
      PaginatedListResponse<PostApiResponse>,
      PaginationArgs | FilterByPostTypeArgs | void
    >({
      query: (args) => ({
        url: "posts",
        method: "GET",
        params: { ...args },
      }),
      transformResponse: (
        response: PaginatedListResponse<PostApiResponse>
      ): PaginatedListResponse<PostApiResponse> => {
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
    getPost: builder.query<PostApiResponse, GetPostArgs>({
      query: ({ postId }) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: "posts", id: arg.postId }],
    }),
    createPost: builder.mutation<unknown, CreatePostArgs>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: "list" }],
    }),
    editPost: builder.mutation<unknown, EditPostArgs>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: arg.id }],
    }),
    deletePost: builder.mutation<unknown, DeletePostArgs>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: arg.id }],
    }),
    getItemCategories: builder.query<string[], void>({
      query: () => ({
        url: `posts/items/categories`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "posts", id: "categories" },
      ],
    }),
    starPost: builder.mutation<boolean, StarPostArgs>({
      query: ({ id }) => ({
        url: `posts/${id}/star`,
        method: "POST",
      }),
      invalidatesTags: ["session"],
    }),
    getUser: builder.query<User, GetUserArgs>({
      query: ({ userId }) => ({ url: `users/${userId}`, method: "GET" }),
      providesTags: (result, error, args) => [
        { type: "users", id: args.userId },
      ],
    }),
    getUsers: builder.query<User[], void>({
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
    setUserActive: builder.mutation<User, SetUserActiveArgs>({
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
