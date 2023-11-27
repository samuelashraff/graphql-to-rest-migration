import "./App.css";
import { Button } from "@/components/ui/button";
import { CreateCourseModal } from "./components/CreateCourseModal";
import CourseGrid from "@/components/CourseGrid";

import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Course, TimetableItem } from "./types";
import { Timetable } from "./components/TimeTable";

function App() {
    const { courses, timetable } = useLoaderData() as { 
        courses: Course[],
        timetable: TimetableItem[] };
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex place-content-between">
            <div className="flex flex-col gap-8">
                <CreateCourseModal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                />
                <CourseGrid courses={courses} />
                <Button
                    className="self-center"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Course
                </Button>
            </div>
            <div className=" border-l pl-4 ms-20"></div>
            <div className="ms-20 w-1/3">
                <Timetable timetable={timetable}/>
            </div>
        </div>
    );
}

export default App;
