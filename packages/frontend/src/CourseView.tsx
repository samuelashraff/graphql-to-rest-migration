import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { BASE_URL } from "./config";
import { Course } from "./types";
import { useLoaderData } from "react-router-dom";

export const CourseView = () => {
  const { course } = useLoaderData() as { course: Course };

  const {
    name,
    credits,
    start_date,
    end_date,
    location,
    responsible_teacher,
    status,
  } = course;


  const deleteCourse = async () => {
    try {
      await fetch(`${BASE_URL}/courses/${course.id}`, {
        method: "DELETE"
      })
    }
    catch (error) {
      console.error("Error: ", error)
    }
  }

  return (
    <Card
      className="max-w-xs rounded overflow-ellipsis shadow-lg min-h-[175px] flex flex-col
cursor-default hover:cursor-pointer
      "
    >
      <CardHeader className="h-2/3">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col  items-start h-1/3">
        <p>
          Dates: {start_date} - {end_date}
        </p>
        <p>
          Credits: <Badge>{credits}</Badge>
        </p>
        <p>Location: {location}</p>
        <p>Organiser: {responsible_teacher}</p>
        <p>
          Status: <Badge>{status}</Badge>
        </p>
      </CardContent>
      <Button onClick={deleteCourse}>Delete course</Button>
    </Card>
  );
};
