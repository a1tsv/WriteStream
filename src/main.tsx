import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

const sum = (a: number, b: number) => {
  const c = 5;
  return c + a + b;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
