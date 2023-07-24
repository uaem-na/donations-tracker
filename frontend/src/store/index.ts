import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@services/auth";
import { postsApi } from "@services/posts";
import { usersApi } from "@services/users";

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: {
      // Add the generated authApi reducer as a specific top-level slice
      [authApi.reducerPath]: authApi.reducer,
      [postsApi.reducerPath]: postsApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        postsApi.middleware,
        usersApi.middleware
      ),
    preloadedState,
  });

  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(store.dispatch);

  return store;
}
