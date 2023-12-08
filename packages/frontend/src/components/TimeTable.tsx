import { TimetableItem } from "@/types";

const Event = ({ item, index }: { item: TimetableItem; index: number }) => {
    const isAssignment = item.deadline;
    const title = isAssignment
        ? item.type[0].toUpperCase() + item.type.substring(1)
        : "Lecture";

    return (
        <li key={index} className="border border-black rounded-md p-4 mt-4">
            <p className="font-bold">
                {title} {index + 1}
            </p>
            {isAssignment && (
                <>
                    <p>
                        Deadline: {new Date(item.deadline).toLocaleDateString()}
                    </p>
                    <p>({daysUntil(new Date(item.deadline))} days left)</p>
                </>
            )}
            {!isAssignment && (
                <>
                    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                    <p>Location: {item.location}</p>
                    <p>({daysUntil(new Date(item.date))} days left)</p>
                </>
            )}
        </li>
    );
};

export function Timetable({ timetable }: { timetable: TimetableItem[] }) {
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Upcoming Events: </h1>
            <ul className="overflow-auto max-h-[50vh]">
                {timetable.map((item, index) => (
                    <Event key={index} item={item} index={index} />
                ))}
            </ul>
        </div>
    );
}

function daysUntil(targetDate: Date): number {
    // Get the current date
    const currentDate = new Date();

    // Set hours, minutes, seconds, and milliseconds to 0 for both dates
    currentDate.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds between the two dates
    const timeDifference = targetDate.getTime() - currentDate.getTime();

    // Convert the time difference to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}
