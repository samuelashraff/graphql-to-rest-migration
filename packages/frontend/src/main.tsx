import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { CourseView } from "./CourseView.tsx";
import { Course } from "./types/index.ts";
import { Layout } from "./components/Layout.tsx";
import { BASE_URL } from "./config.ts";

const router = createBrowserRouter([
    {
        path: "/",
        loader: async () => {
            const courses = (await fetch(BASE_URL).then((res) =>
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
            const [course, assignments, lectures] = await Promise.all([
                fetch(`${BASE_URL}/courses/${params.id}`).then((res) =>
                    res.json(),
                ),
                fetch(`${BASE_URL}/courses/${params.id}/assignments`).then(
                    (res) => res.json(),
                ),
                fetch(`${BASE_URL}/courses/${params.id}/lectures`).then((res) =>
                    res.json(),
                ),
            ]);

            return { ...course, ...assignments, ...lectures };
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
