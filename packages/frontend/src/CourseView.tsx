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
import { LectureForm } from "./components/LectureForm";

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
    const [showLectureForm, setShowLectureForm] = useState(false);

    const columns = [
        {
            title: "details",
            elements: [
                <CourseDetailCard key={data.course.id} course={data.course} />,
            ],
        },
        {
            title: "lectures",
            elements: [
                ...data.lectures.map((lecture) => (
                    <LectureCard key={lecture.id} lecture={lecture} />
                )),
                showLectureForm ? (
                    <LectureForm
                        setShowLectureForm={setShowLectureForm}
                        courseId={data.course.id}
                    />
                ) : (
                    <Button
                        variant="outline"
                        size="icon"
                        className="self-center"
                        onClick={() => setShowLectureForm(true)}
                    >
                        <Plus />
                    </Button>
                ),
            ],
        },
        {
            title: "assignments",
            elements: [
                ...data.assignments.map((assignment) => (
                    <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                    />
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
            <div className="flex gap-10">
                <Button asChild className="self-center">
                    <a href="/">Back</a>
                </Button>
                <Typography variant="h1">{data.course.name}</Typography>
            </div>
            <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
                {columns.map((col) => {
                    return (
                        <div
                            key={col.title}
                            className="col-span-1 flex flex-col gap-4 min-w-min"
                        >
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
