import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const CourseCard: React.FC<{ course: { cname: string; status: string } }> = ({
  course,
}) => {
  return (
    <Card className="max-w-xs rounded overflow-ellipsis shadow-lg">
      <CardHeader>
        <CardTitle>{course.cname}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Status: {course.status}</div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
