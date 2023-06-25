// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "";

// * Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery(`${baseUrl}`),
  endpoints: (builder) => ({
    getSession: builder.query({
      query: () => ({
        url: "auth/session",
        method: "GET",
        withCredentials: true,
      }),
      transformResponse: (response) => {
        if (!response) {
          return null;
        }
        return response;
      },
      providesTags: (result, error, id) => [{ type: "session", id: "current" }],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => {
        return response;
      },
      invalidatesTags: [{ type: "session", id: "current" }],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "session", id: "current" }],
    }),
  }),
});

// * Export hooks for usage in functional components, which are
// * auto-generated based on the defined endpoints
export const {
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
