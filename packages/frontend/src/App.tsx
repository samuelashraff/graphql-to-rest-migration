import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import {CreateCourseModal} from "./components/CreateCourseModal"

function App() {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  return (
    <>
      <pre>{data}</pre>
      <Button onClick={() => setIsModalOpen(true)}>Create Course</Button>
      <CreateCourseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}/>
    </>
  );
}

export default App;
