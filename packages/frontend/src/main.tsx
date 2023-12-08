import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { CourseView } from "./CourseView.tsx";
import { Layout } from "./components/Layout.tsx";
import { GQL_ENDPOINT } from "./config.ts";

export const makeGraphQLQuery = async (query: string) => {
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
            const graphqlQuery = `
            query {
                courses {
                    id
                    name
                    credits
                    status
                  },
                  upcomingEvents {
                    ... on LectureType {id, date, location }
                    ... on AssignmentType {id, deadline, type}
                  }
            }
          `;
            const data = await makeGraphQLQuery(graphqlQuery);
            return data;
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
            const graphqlQuery = `
                query {
                  course(id: ${params.id}) {
                    id
                    name
                    credits
                    user_id
                    status
                    start_date
                    end_date
                    responsible_teacher
                    location
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
