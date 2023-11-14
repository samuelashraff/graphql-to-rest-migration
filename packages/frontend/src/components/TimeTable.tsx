import { BASE_URL } from "@/config";
import { useState, useEffect } from "react";

type TimetableItem = {
    deadline: string;
    type: string;
    date: string;
    location: string;
    isObligatory: boolean;
    daysUntilDeadline?: number;
};

// Helper function to calculate days until an event
function calculateDaysUntilEvent(eventDate: string): number {
    const today = new Date();
    const deadlineDate = new Date(eventDate);
    const timeDifference = deadlineDate.getTime() - today.getTime();
    const daysUntilDeadline = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysUntilDeadline;
}

const Event = ({ item, index }: { item: TimetableItem; index: number }) => {
    const isAssignment = item.deadline ? true : false;
    const title = isAssignment ? "Assignment" : "Lecture";

    if (!item.daysUntilDeadline || item.daysUntilDeadline < 0) {
        return null;
    }

    return (
        <li key={index} className="border border-black rounded-md p-4 mt-4">
            <>
                <p className="font-bold">
                    {title} {index + 1}
                </p>
                <p>Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
                <p>({item.daysUntilDeadline} days left)</p>
            </>
        </li>
    );
};

function byDaysUntilEvent(a: TimetableItem, b: TimetableItem) {
    return a.daysUntilDeadline! - b.daysUntilDeadline!;
}

export function Timetable() {
    const [data, setData] = useState<TimetableItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/timetable`);
                const timetableData = await response.json() as TimetableItem[];
                const timetableDataWithTimeRemaining = timetableData.map((item) => {
                    if (item.deadline) {
                        const daysUntilDeadline = calculateDaysUntilEvent(item.deadline);
                        return { ...item, daysUntilDeadline };
                    } else {
                        const daysUntilLecture = calculateDaysUntilEvent(item.date);
                        return { ...item, daysUntilLecture };
                    }
                })
                setData(timetableDataWithTimeRemaining);
            } catch (error) {
                console.error("Error fetching timetable data" + error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Upcoming Events: </h1>
            <ul className="overflow-auto max-h-[50vh]">
                {data.sort(byDaysUntilEvent).map((item, index) => (
                    <Event key={index} item={item} index={index} />
                ))}
            </ul>
        </div>
    );
}
