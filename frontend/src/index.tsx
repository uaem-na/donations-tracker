import "@styles/index.css";
import App from "app";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import configureAppStore from "store";

const store = configureAppStore({});

const container = document.getElementById("root");
if (!container) {
  throw new Error("No root element");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
