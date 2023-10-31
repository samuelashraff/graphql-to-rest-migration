import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Course } from "@/types";

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/course/${course.id}`);
      }}
      className="max-w-xs rounded overflow-ellipsis shadow-lg min-h-[175px] flex flex-col gap-4
cursor-default hover:cursor-pointer
      "
    >
      <CardHeader className="h-2/3">
        <CardTitle>{course.name}</CardTitle>
      </CardHeader>
      <CardContent className="h-1/3 flex items-center justify-center gap-2">
        <span>ECTS</span>
        <Badge>{course.credits}</Badge>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
