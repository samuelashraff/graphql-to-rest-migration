import CourseCard from "./CourseCard";

export default function CourseGrid() {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-60 mb-4 p-1">
        <CourseCard />
      </div>
      <div className="w-60 mb-4 p-1">
        <CourseCard />
      </div>
      <div className="w-60 mb-4 p-1">
        <CourseCard />
      </div>
      <div className="w-60 mb-4 p-1">
        <CourseCard />
      </div>
      <div className="w-60 mb-4 p-1">
        <CourseCard />
      </div>
      <div className="w-60 mb-4 p-1">
        <CourseCard />
      </div>
    </div>
  );
}
