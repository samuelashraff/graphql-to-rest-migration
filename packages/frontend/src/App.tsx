import "./App.css";
import { Button } from "@/components/ui/button";
import { CreateCourseModal } from "./components/CreateCourseModal";
import CourseGrid from "@/components/CourseGrid";

import { useLoaderData } from "react-router-dom";
import { CourseSummary } from "@/types";
import { useState } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Create Course</Button>
      <CreateCourseModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      <CourseGrid courses={courses} />
    </>
  );
}

export default App;
