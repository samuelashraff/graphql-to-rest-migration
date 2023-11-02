import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Lecture } from "@/types";

const LectureCard: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
    return (
        <Card className="rounded overflow-ellipsis shadow-lg">
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
