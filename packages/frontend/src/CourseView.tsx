import { useReducer, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { BASE_URL } from "./config";
import { Course } from "./types";
import { useLoaderData } from "react-router-dom";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Edit, Trash } from "lucide-react";

const CourseDetailEditForm = ({
  course,
  setIsEditMode,
}: {
  course: Course;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialCourseDetails = course;

  const [courseDetailEdits, setCourseDetailEdits] = useReducer(
    (prevCourse: Course, nextCourse: Partial<Course>) => ({
      ...prevCourse,
      ...nextCourse,
    }),
    initialCourseDetails,
  );
  const saveCourseChanges = async () => {
    try {
      await fetch(`${BASE_URL}/courses/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseDetailEdits),
      });
      setIsEditMode(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setCourseDetailEdits(initialCourseDetails);
  };
  return (
    <CardContent className="flex flex-col items-start h-1/3">
      <form className="flex flex-col gap-4" onSubmit={saveCourseChanges}>
        <div className="flex gap-2 items-center justify-center">
          <Label htmlFor="terms">Credits</Label>
          <Input
            type="text"
            value={courseDetailEdits.credits}
            onChange={(e) =>
              setCourseDetailEdits({ credits: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Label htmlFor="terms">Location</Label>
          <Input
            type="text"
            value={courseDetailEdits.location}
            onChange={(e) => setCourseDetailEdits({ location: e.target.value })}
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Label htmlFor="terms">Organiser</Label>
          <Input
            type="text"
            value={courseDetailEdits.responsible_teacher}
            onChange={(e) =>
              setCourseDetailEdits({ responsible_teacher: e.target.value })
            }
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Label htmlFor="terms">Status</Label>
          <Input
            type="text"
            value={courseDetailEdits.status}
            onChange={(e) => setCourseDetailEdits({ status: e.target.value })}
          />
        </div>
        <div className="flex gap-4 self-center">
          <Button
            onClick={(e) => {
              e.preventDefault();
              cancelEdit();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </CardContent>
  );
};

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

  const deleteCourse = async () => {
   const shouldDelete = window.confirm('Are you sure you want to delete this course?');
   if (!shouldDelete) return;

    try {
      await fetch(`${BASE_URL}/courses/${course.id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Card
      className="p-4 flex flex-col rounded overflow-ellipsis shadow-lg min-h-[175px]cursor-default hover:cursor-pointer
      "
    >
      <CardHeader className="h-2/3">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      {isEditMode ? (
        <CourseDetailEditForm course={course} setIsEditMode={setIsEditMode} />
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
          <div className="flex gap-4 self-center">
            <Button onClick={deleteCourse} variant="destructive">
              <Trash />
            </Button>
            <Button onClick={() => setIsEditMode(true)}>
              <Edit />
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
