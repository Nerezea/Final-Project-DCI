import React from "react";
import ReactDOM from "react-dom/client";
import App from "./controller/App.jsx";
import "./css/main.css";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
