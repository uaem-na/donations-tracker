// * Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "";

// * Define args and result types for query
type Session = {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  verified: boolean;
} | null;

type LoginArgs = {
  username: string;
  password: string;
};

// * Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/auth`,
    credentials: "include",
  }),
  tagTypes: ["session"],
  endpoints: (builder) => ({
    getSession: builder.query<Session, void>({
      query: () => ({
        url: "session",
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "session", id: "current" }],
    }),
    login: builder.mutation<Session, LoginArgs>({
      query: ({ username, password }) => ({
        url: "login",
        method: "POST",
        body: {
          username,
          password,
        },
      }),
      invalidatesTags: [{ type: "session", id: "current" }],
    }),
    logout: builder.mutation<void, void>({
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
