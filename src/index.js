import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom";
import store from "./redux/store"; // Pastikan path sesuai dengan struktur Anda
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
