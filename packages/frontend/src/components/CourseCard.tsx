import { CourseSummary } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";

const CourseCard: React.FC<{ course: CourseSummary }> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/course/${course.id}`);
      }}
      className="max-w-xs rounded overflow-ellipsis shadow-lg min-h-[175px] flex flex-col
cursor-default hover:cursor-pointer
      "
    >
      <CardHeader className="h-2/3">
        <CardTitle>{course.name}</CardTitle>
      </CardHeader>
      <CardContent className="h-1/3">
        <p className="overflow-hidden">Status: {course.status}</p>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
