import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

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
      <pre>{data}</pre>
    </>
  );
}

export default App;
