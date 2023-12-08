import { useState } from "react";
import { useRevalidator } from "react-router-dom";

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Lecture } from "@/types";
import { makeGraphQLQuery } from "@/main";

const LectureCard: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
    const [showOptions, setShowOptions] = useState(false);

    const revalidator = useRevalidator();

    const deleteAssignment = async () => {
        const graphqlMutation = `
        mutation {
            deleteLecture(
                id: ${lecture.id}                
            )                
        }
        `;
        try {
            await makeGraphQLQuery(graphqlMutation).then(() => {
                revalidator.revalidate();
            });
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const lectureOptions = () => {
        if (showOptions) {
            return (
                <div className="z-10 absolute inset-0 bg-white">
                    <div className="flex h-full justify-center items-center">
                        <Button
                            variant={"destructive"}
                            onClick={deleteAssignment}
                        >
                            <Trash />
                        </Button>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card
            className="rounded shadow-lg relative cursor-pointer"
            onClick={() => setShowOptions(!showOptions)}
        >
            {lectureOptions()}
            <CardHeader>
                <CardTitle>
                    {`${new Date(lecture.date).toLocaleDateString()}, ${
                        lecture.start_time
                    } - ${lecture.end_time}`}
                </CardTitle>
                <CardDescription className="flex flex-row justify-center gap-4">
                    <p>
                        <strong>Location: </strong>
                        {lecture.location}
                    </p>
                    <p>
                        <strong>Obligatory: </strong>
                        {lecture.is_obligatory ? "yes" : "no"}
                    </p>
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default LectureCard;
