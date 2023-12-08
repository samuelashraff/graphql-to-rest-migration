import { getDbInstance } from "../database/db";
import { Assignment, Lecture } from "./courses";

const db = getDbInstance();

function isLectureType(obj: any): obj is Lecture {
    return "date" in obj;
}

export const getUpcomingEvents = async () => {
    try {
        const assignments: Assignment[] = await new Promise(
            (resolve, reject) => {
                db.all(
                    `SELECT * FROM assignments 
                    WHERE deadline >= DATE('now') 
                    ORDER BY deadline ASC`,
                    [],
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows as Assignment[]);
                        }
                    },
                );
            },
        );

        const lectures: Lecture[] = await new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM lectures 
                WHERE date >= DATE('now') 
                ORDER BY date ASC`,
                [],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows as Lecture[]);
                    }
                },
            );
        });

        // Combine assignments and lectures
        const timetableData = [...assignments, ...lectures];

        // Sort the combined data by deadline
        timetableData.sort((a, b) => {
            const dateA = isLectureType(a)
                ? new Date(a.date)
                : new Date(a.deadline);
            const dateB = isLectureType(b)
                ? new Date(b.date)
                : new Date(b.deadline);

            return dateA.valueOf() - dateB.valueOf();
        });

        return timetableData;
    } catch (error) {
        console.error("Error while querying the database:", error);
    }
};
