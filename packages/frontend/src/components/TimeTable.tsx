import { BASE_URL } from '@/config';
import { useState, useEffect } from 'react'

type TimeTableItem = {
    deadline: string;
    type: string;
    date: string;
    location: string;
    isObligatory: boolean;
};

export function TimeTable() {
    const [data, setData] = useState<TimeTableItem[]>([])

    // Helper function to calculate days until an event
    function calculateDaysUntilEvent(eventDate: string): number {
        const today = new Date();
        const deadlineDate = new Date(eventDate);
        const timeDifference = deadlineDate.getTime() - today.getTime();
        const daysUntilDeadline = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysUntilDeadline;
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/timetable`)
                const timeTableData = await response.json()
                setData(timeTableData)
            }
            catch (error) {
                console.error("Error fetching timetable data" + error)
            }
        }
        fetchData()
        console.log("Timetable data: " + data)
    }, [])

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Upcoming Events: </h1>

            {data.map((item, index) => (
                <div
                    key={index}
                    className="border border-black rounded-md p-4 mt-4"
                >
                    {item.deadline ? ( // Check if it's an assignment
                        <>
                            <p className="font-bold">Assignment {index + 1}</p>
                            <p>Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
                            <p>({calculateDaysUntilEvent(item.deadline)} days left)</p>
                        </>
                    ) : ( // It's a lecture
                        <>
                            <p className="font-bold">Lecture {index + 1}</p>
                            <p>Location: {item.location}</p>
                            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                            <p>({calculateDaysUntilEvent(item.date)} days left)</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}