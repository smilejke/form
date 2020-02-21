import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.js";
import categories from "./global/categories.js";
import staff from "./global/staff.js";
import "./index.css";

const rootElement = document.getElementById("root");

const globalParams = {
  positions: categories,
  workers: staff
};

const el = <App global={globalParams} />;

ReactDOM.render(el, rootElement);
