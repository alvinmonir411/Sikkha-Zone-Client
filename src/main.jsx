import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navber from "./components/Navber";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";
import Root from "./layouts/Root.jsx";
import AuthProvider from "./context/Authcontext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    <ToastContainer />
    <AuthProvider>
      <RouterProvider router={router}>
        <Root />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>
);
