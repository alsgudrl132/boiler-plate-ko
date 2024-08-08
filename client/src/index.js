import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import { thunk } from "redux-thunk"; // 'thunk'를 명시적으로 가져옵니다.
import Reducer from "./_reducer/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk // 'thunk' 사용
)(createStore);

root.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
);
reportWebVitals();
