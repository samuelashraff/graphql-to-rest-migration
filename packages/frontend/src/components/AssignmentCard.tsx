import { useState } from "react";
import { useRevalidator } from "react-router-dom";

import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Assignment } from "@/types";
import { BASE_URL } from "@/config";

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const AssignmentCard: React.FC<{ assignment: Assignment }> = ({
    assignment,
}) => {
    const [showOptions, setShowOptions] = useState(false);

    const revalidator = useRevalidator();

    const deleteAssignment = async () => {
        try {
            await fetch(`${BASE_URL}/assignments/${assignment.id}`, {
                method: "DELETE",
            }).then(() => {
                revalidator.revalidate();
            });
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const assignmentOptions = () => {
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
            {assignmentOptions()}
            <CardHeader>
                <CardTitle>{`${toTitleCase(assignment.type)} - ${new Date(
                    assignment.deadline,
                ).toLocaleDateString()}`}</CardTitle>
                <CardDescription className="flex flex-row justify-center gap-4">
                    <p>
                        <strong>Obligatory: </strong>
                        {assignment.is_obligatory ? "yes" : "no"}
                    </p>
                    <p>
                        <strong>Groupwork: </strong>
                        {assignment.is_group ? "yes" : "no"}
                    </p>
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default AssignmentCard;
