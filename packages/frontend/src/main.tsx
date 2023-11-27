import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { CourseView } from "./CourseView.tsx";
import { Course, TimetableItem } from "./types/index.ts";
import { Layout } from "./components/Layout.tsx";
import { BASE_URL, GQL_ENDPOINT } from "./config.ts";

const makeGraphQLQuery = async (query: string) => {
    try {
        const response = await fetch(GQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error making GraphQL query:", error);
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        loader: async () => {
            const courses = (await fetch(BASE_URL).then((res) =>
                res.json(),
            )) as Course[];
            const timetable = (await fetch(`${BASE_URL}/timetable`).then((res) => 
                res.json(),
            )) as TimetableItem[];

            return { courses, timetable };
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
            // const [course, assignments, lectures] = await Promise.all([
            //     fetch(`${BASE_URL}/courses/${params.id}`).then((res) =>
            //         res.json(),
            //     ),
            //     fetch(`${BASE_URL}/courses/${params.id}/assignments`).then(
            //         (res) => res.json(),
            //     ),
            //     fetch(`${BASE_URL}/courses/${params.id}/lectures`).then((res) =>
            //         res.json(),
            //     ),
            // ]);

            // return { ...course, ...assignments, ...lectures };
            //
            //

            const graphqlQuery = `
                query {
                  course(id: ${params.id}) {
                    id
                    name
                    credits
                    user_id
                    status
                    notes
                    start_date
                    end_date
                    responsible_teacher
                    location
                    course_link
                    assignments {
                      id
                      type
                      deadline
                      is_obligatory
                      is_group
                    }
                    lectures {
                      id
                      date
                      start_time
                      end_time
                      location
                      is_obligatory
                    }
                  }
                }
              `;

            const data = await makeGraphQLQuery(graphqlQuery);
            return data.course;
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
