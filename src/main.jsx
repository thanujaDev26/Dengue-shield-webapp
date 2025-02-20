import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./Components/ProtectedRoutes/AuthContext.jsx";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {" "}
    {/* ✅ Wrap everything inside BrowserRouter */}
    <RecoilRoot>
      <AuthProvider>
        {" "}
        {/* ✅ Move AuthProvider inside BrowserRouter */}
        <App />
      </AuthProvider>
    </RecoilRoot>
  </BrowserRouter>
);
