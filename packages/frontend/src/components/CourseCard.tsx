import { CourseSummary } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const CourseCard: React.FC<{ course: CourseSummary }> = ({ course }) => {
  return (
    <Card className="max-w-xs rounded overflow-ellipsis shadow-lg min-h-[175px] flex flex-col">
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
