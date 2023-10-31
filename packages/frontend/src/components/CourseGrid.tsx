import { Course } from "@/types";
import CourseCard from "./CourseCard";
import { Typography } from "./ui/typogrpahy";

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const CourseGrid: React.FC<{
  courses: Course[];
}> = ({ courses }) => {
  const groupedCourses: { [key: string]: Course[] } = Object.groupBy(
    courses,
    (course: Course) => course.status,
  );
  const statuses = ["not started", "in progress", "done"];

  return (
    <div className="grid grid-cols-3 gap-4">
      {statuses.map((status) => {
        return (
          <div className="col-span-1 flex flex-col gap-4">
            <Typography variant="h2">{toTitleCase(status)}</Typography>
            {groupedCourses[status].map((course) => {
              return <CourseCard course={course} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CourseGrid;
