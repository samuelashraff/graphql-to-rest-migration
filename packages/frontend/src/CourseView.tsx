import { useLoaderData } from "react-router-dom";
import { CourseDetailCard } from "./components/CourseDetails";
import { Typography } from "./components/ui/typogrpahy";
import { Course } from "./types";

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export const CourseView = () => {
    const { course } = useLoaderData() as { course: Course };

    const columns = [
        {
            title: "details",
            elements: [<CourseDetailCard course={course} />],
        },
        {
            title: "lectures",
            elements: [<CourseDetailCard course={course} />],
        },
        {
            title: "assignments",
            elements: [<CourseDetailCard course={course} />],
        },
    ];

    return (
        <div className="flex flex-col gap-10 flex-grow">
            <div className="flex">
                <Typography variant="h1">{course.name}</Typography>
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
