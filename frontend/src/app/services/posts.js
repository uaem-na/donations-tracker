// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "";

// * Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery(`${baseUrl}`),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "posts/",
        method: "GET",
        withCredentials: true,
      }),
      transformResponse: (response) => {
        return response;
      },
      transformErrorRespons: (error) => {
        return error;
      },
      providesTags: (result, error, arg) => [{ type: "allPosts" }],
    }),
  }),
});

// * Export hooks for usage in functional components, which are
// * auto-generated based on the defined endpoints
export const { useGetPostsQuery } = postsApi;
