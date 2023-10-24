import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const CourseCard: React.FC<{ course: { cname: string; status: string } }> = ({
  course,
}) => {
  return (
    <Card className="max-w-xs rounded overflow-ellipsis shadow-lg h-40 flex flex-col">
      <CardHeader className="h-2/3">
        <CardTitle>{course.cname}</CardTitle>
      </CardHeader>
      <CardContent className="h-1/3">
        <p className="overflow-hidden">Status: {course.status}</p>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
