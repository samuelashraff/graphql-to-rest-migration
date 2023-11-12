import { BASE_URL } from "@/config";
import { useState, useEffect } from "react";

type TimeTableItem = {
    deadline: string;
    type: string;
    date: string;
    location: string;
    isObligatory: boolean;
};

// Helper function to calculate days until an event
function calculateDaysUntilEvent(eventDate: string): number {
    const today = new Date();
    const deadlineDate = new Date(eventDate);
    const timeDifference = deadlineDate.getTime() - today.getTime();
    const daysUntilDeadline = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysUntilDeadline;
}

const Event = ({ item, index }: { item: TimeTableItem; index: number }) => {
    const isAssignment = item.deadline ? true : false;
    const title = isAssignment ? "Assignment" : "Lecture";
    const daysUntilEvent = isAssignment
        ? calculateDaysUntilEvent(item.deadline)
        : calculateDaysUntilEvent(item.date);

    return (
        <li key={index} className="border border-black rounded-md p-4 mt-4">
            <>
                <p className="font-bold">
                    {title} {index + 1}
                </p>
                <p>Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
                <p>({daysUntilEvent} days left)</p>
            </>
        </li>
    );
};

export function Timetable() {
    const [data, setData] = useState<TimeTableItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/timetable`);
                const timeTableData = await response.json();
                setData(timeTableData);
            } catch (error) {
                console.error("Error fetching timetable data" + error);
            }
        };
        fetchData();
    }, [data]);

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Upcoming Events: </h1>
            <ul className="overflow-auto max-h-[50vh]">
                {data.map((item, index) => (
                    <Event key={index} item={item} index={index} />
                ))}
            </ul>
        </div>
    );
}
