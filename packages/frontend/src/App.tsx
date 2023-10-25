import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import CourseGrid from "./components/CourseGrid";

function App() {
  const [courses, setData] = useState<
    { id: number; cname: string; status: string }[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Button>Button</Button>
      <CourseGrid courses={courses} />
    </>
  );
}

export default App;
