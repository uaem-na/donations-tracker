// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "";

// * Define args and result types for query
export type PostApiResponse = {
  id: string;
  title: string;
  content: string;
  status: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  items: PostItemApiResponse[];
};

export type PostItemApiResponse = {
  category: string;
  description: string;
  price: number;
  quantity: number;
  _id: string;
};

export type Post = Omit<PostApiResponse, "items"> & {
  items: PostItem[];
};

export type PostItem = Omit<PostItemApiResponse, "_id"> & {
  id: string;
};

type GetPostArgs = {
  postId: string;
};

// * Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/posts`,
    credentials: "include",
  }),

  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
      transformResponse: (posts: PostApiResponse[]): Post[] => {
        return posts.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toLocaleDateString(),
          updatedAt: new Date(post.updatedAt).toLocaleDateString(),
          items: post.items.map(
            (item): PostItem => ({
              ...item,
              id: item._id,
            })
          ),
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
    getPost: builder.query<Post, GetPostArgs>({
      query: ({ postId }) => `/posts/${postId}`,
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
        url: `/${post.id}`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "posts", id: arg.id }],
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
} = postsApi;
