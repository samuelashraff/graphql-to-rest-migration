import { TimetableItem } from "@/types";


const Event = ({ item, index }: { item: TimetableItem; index: number }) => {
    const isAssignment = item.deadline ? true : false;
    const title = isAssignment ? "Assignment" : "Lecture";

    return (
        <li key={index} className="border border-black rounded-md p-4 mt-4">
            <>
                <p className="font-bold">
                    {title} {index + 1}
                </p>
                {isAssignment && (
                    <>
                        <p>Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
                        <p>({item.daysUntilDeadline} days left)</p>
                    </>
                )}
                {!isAssignment && (
                    <>
                        <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                        <p>Location: {item.location}</p>
                        <p>({item.daysUntilDeadline} days left)</p>
                    </>
                )}
            </>
        </li>
    );
};

function byDaysUntilEvent(a: TimetableItem, b: TimetableItem) {
    return a.daysUntilDeadline! - b.daysUntilDeadline!;
}


export function Timetable({ timetable }: { timetable: TimetableItem[] }) {

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Upcoming Events: </h1>
            <ul className="overflow-auto max-h-[50vh]">
                {timetable.sort(byDaysUntilEvent).map((item, index) => (
                    <Event key={index} item={item} index={index} />
                ))}
            </ul>
        </div>
    );
}
