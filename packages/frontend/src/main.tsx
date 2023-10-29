import React from "react";
import ReactDOM from "react-dom/client";
import App, { appLoader } from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { CourseView } from "./CourseView.tsx";
import { Course } from "./types/index.ts";
import { Layout } from "./components/Layout.tsx";

const ROOT_URL = "http://localhost:4000";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const courses = (await fetch(ROOT_URL).then((res) =>
        res.json(),
      )) as Course[];

      return { courses };
    },
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/course/:id",
    loader: async ({ params }) => {
      const course = await fetch(`${ROOT_URL}/courses/${params.id}`).then(
        (res) => res.json(),
      );
      return { course };
    },
    element: (
      <Layout>
        <CourseView />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
