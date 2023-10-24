import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import CourseGrid from "./components/CourseGrid";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  return (
    <>
      <Button>Button</Button>
      <CourseGrid />
      <pre>{data}</pre>
    </>
  );
}

export default App;
