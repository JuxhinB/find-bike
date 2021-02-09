import React from "react";
import ReactDOM from "react-dom";
import "./theme/style/_main_index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
require("normalize.css");

let root = document.getElementById("root") as HTMLDivElement;
let initialLoader = document.getElementById("app-loader") as HTMLDivElement;

if (initialLoader) {
  initialLoader.style.transitionDuration = "1s";
  window.addEventListener("load", () => {
    initialLoader.classList.add("hidden");
    setTimeout(() => {
      root.classList.remove("hidden");
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        root
      );
      initialLoader.remove();
    }, 1000);
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
