import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Lecture } from "@/types";

const LectureCard: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
    return (
        <Card className="p-4 rounded overflow-ellipsis shadow-lg">
            <CardHeader>
                <CardTitle>
                    {new Date(lecture.date).toLocaleDateString()}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
                <p>
                    <strong>Time: </strong>
                    {`${lecture.start_time} - ${lecture.end_time}`}
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
