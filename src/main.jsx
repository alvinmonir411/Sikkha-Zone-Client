import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navber from "./components/Navber";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";
import Root from "./layouts/Root.jsx";

import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <Root />
        </RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
