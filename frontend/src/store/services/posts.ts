// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "";

// * Define args and result types for query
export type PostAuthorApiResponse = {
  firstName: string;
  id: string;
  lastName: string;
};

export type PostApiResponse = {
  author: PostAuthorApiResponse;
  createdAt: string;
  id: string;
  items: PostItemApiResponse[];
  location: PostLocationApiResponse;
  status: string;
  title: string;
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

type GetPostArgs = {
  postId: string;
};

// TODO: probably rename _id to id

// * Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/posts`,
    credentials: "include",
  }),
  tagTypes: ["posts", "posts.items.categories"],
  endpoints: (builder) => ({
    getPosts: builder.query<PostApiResponse[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
      transformResponse: (posts: PostApiResponse[]): PostApiResponse[] => {
        return posts.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toLocaleDateString(),
          updatedAt: new Date(post.updatedAt).toLocaleDateString(),
          items: post.items.map(
            (item): PostItemApiResponse => ({
              ...item,
            })
          ),
          location: {
            ...post.location,
          },
        }));
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "posts" as const, id })),
              { type: "posts", id: "LIST" },
            ]
          : [{ type: "posts", id: "LIST" }],
    }),
    getPost: builder.query<PostApiResponse, GetPostArgs>({
      query: ({ postId }) => `/${postId}`,
      providesTags: (result, error, arg) => [{ type: "posts", id: arg.postId }],
    }),
    createPost: builder.mutation({
      query: (initialPost) => ({
        url: `/`,
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["posts"],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `${post.id}`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: arg.id }],
    }),
    getItemCategories: builder.query<string[], void>({
      query: () => ({
        url: `/items/categories`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "posts.items.categories" },
      ],
    }),
  }),
});

// * Export hooks for usage in functional components, which are
// * auto-generated based on the defined endpoints
export const {
  useCreatePostMutation,
  useEditPostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useGetItemCategoriesQuery,
} = postsApi;
