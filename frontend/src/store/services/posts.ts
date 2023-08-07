// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "";

// * Define API response types
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
  status: string;
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

// * Define args
type GetPostArgs = {
  postId: string;
};

type CreaetOrEditPostArgs = Omit<
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

type DeletePostArgs = Pick<PostApiResponse, "id">;

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
          item: {
            ...post.item,
          },
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
    createPost: builder.mutation<unknown, CreaetOrEditPostArgs>({
      query: (post) => ({
        url: `/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: "LIST" }],
    }),
    editPost: builder.mutation<unknown, CreaetOrEditPostArgs>({
      query: (post) => ({
        url: `${post.id}`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: arg.id }],
    }),
    deletePost: builder.mutation<unknown, DeletePostArgs>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
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
  useGetPostQuery,
  useLazyGetPostQuery,
  useGetPostsQuery,
  useGetItemCategoriesQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = postsApi;
