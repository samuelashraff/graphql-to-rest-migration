import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Lecture } from "@/types";

const LectureCard: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
    return (
        <Card className="p-4 rounded overflow-ellipsis shadow-lg">
            <CardHeader>
                <CardTitle>{`Lecture ${lecture.id}`}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
                <p>
                    <strong>Date: </strong>
                    {lecture.date.toLocaleDateString()}
                </p>
                <p>
                    <strong>Time: </strong>
                    {`${lecture.startTime} - ${lecture.endTime}`}
                </p>
                <p>
                    <strong>Location: </strong>
                    {lecture.location}
                </p>
                <p>
                    <strong>Obligatory: </strong>
                    {lecture.obligatory ? "yes" : "no"}
                </p>
            </CardContent>
        </Card>
    );
};

export default LectureCard;
