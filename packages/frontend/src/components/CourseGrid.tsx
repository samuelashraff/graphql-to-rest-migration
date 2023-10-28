import { CourseSummary } from "@/types";
import CourseCard from "./CourseCard";

const CourseGrid: React.FC<{
  courses: CourseSummary[];
}> = ({ courses }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {courses.map((course) => (
        <div key={course.id} className="mb-4 p-1">
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseGrid;
