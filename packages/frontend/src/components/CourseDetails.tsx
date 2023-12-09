import { Course } from "@/types";
import { Label } from "@radix-ui/react-label";
import { Trash, Edit } from "lucide-react";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CardContent, Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { makeGraphQLQuery } from "@/main";

const CourseDetailEditForm = ({
    course,
    setIsEditMode,
}: {
    course: Course;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const initialCourseDetails = course;

    const [courseDetailEdits, setCourseDetailEdits] = useReducer(
        (prevCourse: Course, nextCourse: Partial<Course>) => ({
            ...prevCourse,
            ...nextCourse,
        }),
        initialCourseDetails,
    );
    const saveCourseChanges = async () => {
        const graphqlMutation = `
            mutation {
                updateCourse(
                  id: ${courseDetailEdits.id}
                  status: "${courseDetailEdits.status}"
                  location: "${courseDetailEdits.location}"
                  responsible_teacher: "${courseDetailEdits.responsible_teacher}"
                  credits: ${courseDetailEdits.credits}
                ) {
                  success
                }
            }`;
        makeGraphQLQuery(graphqlMutation).then(() => setIsEditMode(false));
    };

    const cancelEdit = () => {
        setIsEditMode(false);
        setCourseDetailEdits(initialCourseDetails);
    };
    return (
        <CardContent className="flex flex-col items-start h-1/3">
            <form className="flex flex-col gap-4" onSubmit={saveCourseChanges}>
                <div className="flex gap-2 items-center justify-center">
                    <Label htmlFor="terms">Credits</Label>
                    <Input
                        type="text"
                        value={courseDetailEdits.credits}
                        onChange={(e) =>
                            setCourseDetailEdits({
                                credits: parseInt(e.target.value),
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Label htmlFor="terms">Location</Label>
                    <Input
                        type="text"
                        value={courseDetailEdits.location}
                        onChange={(e) =>
                            setCourseDetailEdits({ location: e.target.value })
                        }
                    />
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Label htmlFor="terms">Organiser</Label>
                    <Input
                        type="text"
                        value={courseDetailEdits.responsible_teacher}
                        onChange={(e) =>
                            setCourseDetailEdits({
                                responsible_teacher: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Label htmlFor="terms">Status</Label>
                    <Input
                        type="text"
                        value={courseDetailEdits.status}
                        onChange={(e) =>
                            setCourseDetailEdits({ status: e.target.value })
                        }
                    />
                </div>
                <div className="flex gap-4 self-center">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            cancelEdit();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </CardContent>
    );
};

export const CourseDetailCard = ({ course }: { course: Course }) => {
    const {
        credits,
        start_date,
        end_date,
        location,
        responsible_teacher,
        status,
    } = course;

    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    const deleteCourse = async () => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this course?",
        );
        if (!shouldDelete) return;

        const graphqlMutation = `
            mutation {
                deleteCourse(
                    id: ${course.id}                
                )                
            }
            `;

        makeGraphQLQuery(graphqlMutation)
            .then(() => {
                navigate("/", { replace: true });
            })
            .catch((err) => console.error("Error: ", err));
    };

    return (
        <Card
            className="pt-6 pb-6 flex 
            flex-col rounded 
            shadow-lg"
        >
            {isEditMode ? (
                <CourseDetailEditForm
                    course={course}
                    setIsEditMode={setIsEditMode}
                />
            ) : (
                <>
                    <CardContent className="flex flex-col items-start">
                        <p>
                            <strong>Dates: </strong> {start_date} - {end_date}
                        </p>
                        <p>
                            <strong>Credits:</strong> <Badge>{credits}</Badge>
                        </p>
                        <p>
                            <strong>Location: </strong>
                            {location}
                        </p>
                        <p>
                            <strong>Organiser: </strong>
                            {responsible_teacher}
                        </p>
                        <p>
                            <strong>Status: </strong>
                            <Badge>{status}</Badge>
                        </p>
                    </CardContent>
                    <div className="flex gap-4 self-center">
                        <Button onClick={deleteCourse} variant="destructive">
                            <Trash />
                        </Button>
                        <Button onClick={() => setIsEditMode(true)}>
                            <Edit />
                        </Button>
                    </div>
                </>
            )}
        </Card>
    );
};
