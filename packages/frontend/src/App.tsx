import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import {CreateCourseModal} from "./components/CreateCourseModal"
import CourseGrid from "./components/CourseGrid";


function App() {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [courses, setCourses] = useState<
    { id: number; cname: string; status: string }[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <pre>{data}</pre>
      <Button onClick={() => setIsModalOpen(true)}>Create Course</Button>
      <CreateCourseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}/>
      <CourseGrid courses={courses} />
    </>
  );
}

export default App;
