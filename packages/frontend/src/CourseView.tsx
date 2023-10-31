import { useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { BASE_URL } from "./config";
import { Course } from "./types";
import { useLoaderData } from "react-router-dom";
import { Input } from "./components/ui/input";

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

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedStatus, setEditedStatus] = useState(status);

  const saveCourseChanges = async () => {
    try {
      await fetch(`${BASE_URL}/courses/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: editedName,
          status: editedStatus
        })
      })
      setIsEditMode(false)
    }
    catch (error) {
      console.error("Error: ", error)
    }
  }

  const cancelEdit = () => {
    setEditedName(name)
    setEditedStatus(status)
    setIsEditMode(false)
  }


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
      {isEditMode ? (
        <CardContent className="flex flex-col items-start h-1/3">
          <form onSubmit={saveCourseChanges}>
            <Input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Input
              type="text"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            />
            <div className="flex-row">
              <Button type="submit">Save</Button>
              <Button onClick={cancelEdit}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      ) : (
        <>
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
          <Button onClick={() => setIsEditMode(true)}>Edit course details</Button>
        </>
      )}
    </Card>
  );
};
