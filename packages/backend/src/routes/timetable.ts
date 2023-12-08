import Router from "koa-router";
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

export type TimetableItem = {
    deadline: string;
    type?: string;
    date: string;
    location?: string;
    isObligatory?: boolean;
};

export const timeTableRouter = new Router({
    prefix: "/timetable",
});

timeTableRouter.get("/", async (ctx, next) => {
    try {
        const assignments: TimetableItem[] = await new Promise(
            (resolve, reject) => {
                db.all(
                    `SELECT deadline, type FROM assignments`,
                    [],
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows as TimetableItem[]);
                        }
                    },
                );
            },
        );

        const lectures: TimetableItem[] = await new Promise(
            (resolve, reject) => {
                db.all(
                    `SELECT date, location, is_obligatory FROM lectures`,
                    [],
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows as TimetableItem[]);
                        }
                    },
                );
            },
        );

        const now = new Date();

        // Combine assignments and lectures
        const timetableData: TimetableItem[] = [...assignments, ...lectures];

        // Sort the combined data by deadline
        timetableData.sort((a, b) => {
            const dateA = a.deadline ? new Date(a.deadline) : new Date(a.date);
            const dateB = b.deadline ? new Date(b.deadline) : new Date(b.date);

            return dateA.valueOf() - dateB.valueOf();
        });

        // Filter out items with a deadline in the past
        const upcomingItems = timetableData.filter((item) => {
            return !item.deadline || new Date(item.deadline) >= now;
        });

        ctx.body = upcomingItems;
        ctx.status = 200;
    } catch (error) {
        console.error("Error while querying the database:", error);
        ctx.status = 500;
        ctx.body = { error: "Internal Server Error" };
    }
    next();
});
