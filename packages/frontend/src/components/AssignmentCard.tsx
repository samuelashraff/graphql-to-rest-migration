import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Assignment } from "@/types";

const AssignmentCard: React.FC<{ assignment: Assignment }> = ({
    assignment,
}) => {
    return (
        <Card className="p-4 rounded overflow-ellipsis shadow-lg">
            <CardHeader>
                <CardTitle>{assignment.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
                <p>
                    <strong>Type: </strong>
                    {assignment.type}
                </p>
                <p>
                    <strong>Due: </strong>
                    {assignment.deadline.toLocaleDateString()}
                </p>
                <p>
                    <strong>Obligatory: </strong>
                    {assignment.obligatory ? "yes" : "no"}
                </p>
                <p>
                    <strong>Groupwork: </strong>
                    {assignment.group ? "yes" : "no"}
                </p>
            </CardContent>
        </Card>
    );
};

export default AssignmentCard;
