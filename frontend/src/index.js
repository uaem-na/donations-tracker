import React from "react";
import ReactDOM from "react-dom";
import "./assets/style/index-compiled.css";
import App from "./App";
import configureAppStore from "./app/store";
import { Provider } from "react-redux";

const store = configureAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
