import { useLoaderData } from "react-router-dom";
import { CourseDetailCard } from "./components/CourseDetails";
import { Typography } from "./components/ui/typogrpahy";
import { Assignment, Course, Lecture } from "./types";
import AssignmentCard from "./components/AssignmentCard";
import LectureCard from "./components/LectureCard";
import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { AssignmentForm } from "./components/AssignmentForm";

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export const CourseView = () => {
    const data = useLoaderData() as {
        course: Course;
        assignments: Assignment[];
        lectures: Lecture[];
    };
    const [showAssignmentForm, setShowAssignmentForm] = useState(false);

    const columns = [
        {
            title: "details",
            elements: [<CourseDetailCard course={data.course} />],
        },
        {
            title: "lectures",
            elements: [
                ...data.lectures.map((lecture) => (
                    <LectureCard lecture={lecture} />
                )),
                <Button variant="outline" size="icon" className="self-center">
                    <Plus />
                </Button>,
            ],
        },
        {
            title: "assignments",
            elements: [
                ...data.assignments.map((assignment) => (
                    <AssignmentCard assignment={assignment} />
                )),
                showAssignmentForm ? (
                    <AssignmentForm
                        setShowAssignmentForm={setShowAssignmentForm}
                        courseId={data.course.id}
                    />
                ) : (
                    <Button
                        variant="outline"
                        size="icon"
                        className="self-center"
                        onClick={() => {
                            setShowAssignmentForm(true);
                            console.log(showAssignmentForm);
                        }}
                    >
                        <Plus />
                    </Button>
                ),
            ],
        },
    ];

    return (
        <div className="flex flex-col gap-10 flex-grow">
            <div className="flex">
                <Typography variant="h1">{data.course.name}</Typography>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {columns.map((col) => {
                    return (
                        <div className="col-span-1 flex flex-col gap-4">
                            <Typography variant="h2">
                                {toTitleCase(col.title)}
                            </Typography>
                            {col.elements.map((element) => {
                                return element;
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
