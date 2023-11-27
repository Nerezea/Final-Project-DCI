import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/main.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./pages/store/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

//npm i redux react-redux @reduxjs/toolkit
//npm i react-router-dom
