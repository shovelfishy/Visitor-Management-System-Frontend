import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login.tsx";
import "./index.css";
import User from "./pages/User.tsx";
import Visitor from "./pages/Visitor.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <User />,
  },
  {
    path: "/registration/:id",
    element: <User />,
  },
  {
    path: "/visitor/:visitorId",
    element: <Visitor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
