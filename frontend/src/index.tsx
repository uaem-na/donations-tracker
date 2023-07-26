import { ToastProvider } from "@components/Toast";
import "@styles/index.css";
import App from "app";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import configureAppStore from "store";
import "./i18n";

const store = configureAppStore({});

const container = document.getElementById("root");
if (!container) {
  throw new Error("No root element");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
