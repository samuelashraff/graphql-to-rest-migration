import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
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
        <Card className="rounded shadow-lg">
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
