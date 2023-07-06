import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import configureAppStore from "./store";
import "./styles/index-compiled.css";

const store = configureAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
