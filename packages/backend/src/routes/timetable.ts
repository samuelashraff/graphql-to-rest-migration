import Router from "koa-router";
import { getDbInstance } from "../database/db";

const db = getDbInstance();

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
                    `SELECT deadline, type FROM assignments WHERE deadline >= DATE('now')`,
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
                    `SELECT date, location, is_obligatory FROM lectures WHERE date >= DATE('now')`,
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

        // Combine assignments and lectures
        const timetableData: TimetableItem[] = [...assignments, ...lectures];

        // Sort the combined data by deadline
        timetableData.sort((a, b) => {
            const dateA = a.deadline ? new Date(a.deadline) : new Date(a.date);
            const dateB = b.deadline ? new Date(b.deadline) : new Date(b.date);

            return dateA.valueOf() - dateB.valueOf();
        });

        ctx.body = timetableData;
        ctx.status = 200;
    } catch (error) {
        console.error("Error while querying the database:", error);
        ctx.status = 500;
        ctx.body = { error: "Internal Server Error" };
    }
    next();
});
