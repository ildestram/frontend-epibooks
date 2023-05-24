import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginReducer from "./Reducers/loginSlice";
import postsReducer from "./Reducers/postsSlice";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  loginState: LoginReducer,
  postsState: postsReducer,
});
const store = configureStore({
  reducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
