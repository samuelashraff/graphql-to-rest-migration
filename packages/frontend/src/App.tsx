import "./App.css";
import { Button } from "@/components/ui/button";
import { CreateCourseModal } from "./components/CreateCourseModal";
import CourseGrid from "@/components/CourseGrid";

import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Course } from "./types";

function App() {
  const { courses } = useLoaderData() as { courses: Course[] };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Create Course</Button>
      <CreateCourseModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      <CourseGrid courses={courses} />
    </div>
  );
}

export default App;
