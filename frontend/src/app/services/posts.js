// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "";

// * Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/posts`,
    withCredentials: true,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "posts", id: "list" }],
    }),
  }),
});

// * Export hooks for usage in functional components, which are
// * auto-generated based on the defined endpoints
export const { useGetPostsQuery } = postsApi;
