import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Assignment } from "@/types";

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const AssignmentCard: React.FC<{ assignment: Assignment }> = ({
    assignment,
}) => {
    return (
        <Card className="p-4 rounded overflow-ellipsis shadow-lg">
            <CardHeader>
                <CardTitle>{`${toTitleCase(assignment.type)} - ${new Date(
                    assignment.deadline,
                ).toLocaleDateString()}`}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
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
