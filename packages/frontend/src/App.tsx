import "./App.css";
import { Button } from "@/components/ui/button";
import CourseGrid from "@/components/CourseGrid";
import { useLoaderData } from "react-router-dom";
import { CourseSummary } from "@/types";

export async function appLoader() {
  const courses = await fetch("http://localhost:4000").then((res) =>
    res.json()
  );
  return { courses };
}

function App() {
  const { courses } = useLoaderData() as {
    courses: CourseSummary[];
  };

  return (
    <>
      <Button>Button</Button>
      <CourseGrid courses={courses} />
    </>
  );
}

export default App;
