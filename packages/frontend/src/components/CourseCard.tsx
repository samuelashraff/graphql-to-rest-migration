import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function CourseCard() {
  return (
    <Card className="max-w-xs rounded overflow-ellipsis shadow-lg">
      <CardHeader>
        <CardTitle>Design of WWW Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Status: In progress</div>
      </CardContent>
    </Card>
  );
}
