import "./App.css";
import { Button } from "@/components/ui/button";
import CourseGrid from "./components/CourseGrid";
import { useLoaderData } from "react-router-dom";

export async function appLoader() {
  const courses = await fetch("http://localhost:4000").then((res) =>
    res.json()
  );
  return { courses };
}

function App() {
  const { courses } = useLoaderData() as {
    courses: {
      id: number;
      cname: string;
      status: string;
    }[];
  };

  return (
    <>
      <Button>Button</Button>
      <CourseGrid courses={courses} />
    </>
  );
}

export default App;
