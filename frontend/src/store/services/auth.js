// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "";

// * Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/auth`,
    withCredentials: true,
  }),
  endpoints: (builder) => ({
    getSession: builder.query({
      query: () => ({
        url: "session",
        method: "GET",
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
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "session", id: "current" }],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "session", id: "current" }],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
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
  useRegisterMutation,
} = authApi;
