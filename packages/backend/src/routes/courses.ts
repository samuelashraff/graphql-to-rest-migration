import Router from "koa-router";
import { getDbInstance } from "../database/db";

const db = getDbInstance();

export type Course = {
    id: number;
    name: string;
    credits: number;
    user_id: number;
    status: string;
    notes: string;
    start_date: string;
    end_date: string;
    responsible_teacher: string;
    location: string;
    course_link: string;
};

export const coursesRouter = new Router({
    prefix: "/courses",
});

coursesRouter.get("/:id", async (ctx, next) => {
    const { id } = ctx.params;

    try {
        const course = await new Promise((resolve, reject) => {
            db.get(
                `SELECT * FROM courses WHERE id = ${id}`,
                [],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                },
            );
        });

        const assignments = await new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM assignments WHERE course_id = ${id} ORDER BY deadline ASC`,
                [],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                },
            );
        });

        const lectures = await new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM lectures WHERE course_id = ${id} ORDER BY date ASC`,
                [],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                },
            );
        });

        ctx.body = { course, assignments, lectures };
        ctx.status = 200;
    } catch (error) {
        console.error("Error while querying the database:", error);
        ctx.status = 500;
        ctx.body = { error: "Internal Server Error" };
    }
    next();
});

coursesRouter.delete("/:id", async (ctx, _next) => {
    const { id } = ctx.params;
    console.log("deleting");

    try {
        await new Promise<void>((resolve, reject) => {
            db.run(`DELETE FROM courses WHERE id = ${id}`, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log("Course deleted from database");
        ctx.status = 200;
    } catch (error) {
        console.error("Error while deleting course from database");
        ctx.status = 500;
        ctx.body = { error: "Internal Server Error" };
    }
});

coursesRouter.put("/:id", async (ctx, _next) => {
    const { id } = ctx.params;
    const {
        name,
        start_date,
        end_date,
        responsible_teacher,
        location,
        course_link,
        credits,
        status,
        notes,
    } = ctx.request.body as Course;

    try {
        await new Promise((_resolve, reject) => {
            db.run(
                `UPDATE courses SET
            name = '${name}',
            credits = ${credits},
            status = '${status}',
            notes = '${notes}',
            start_date = '${start_date}',
            end_date = '${end_date}',
            responsible_teacher = '${responsible_teacher}',
            location = '${location}',
            course_link = '${course_link}'
            WHERE id = ${id}`,
                [],
                (err) => {
                    if (err) {
                        reject(err);
                    }
                },
            );
        });
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        console.error("Error while updating course in DB: ", error);
    }
});

coursesRouter.post("/:id/assignments", async (ctx) => {
    const { id } = ctx.params;

    const { type, deadline, is_obligatory, is_group } = ctx.request.body as {
        type: string;
        deadline: Date;
        is_obligatory: boolean;
        is_group: boolean;
    };

    db.run(
        `INSERT INTO assignments (course_id, type, deadline, is_obligatory, is_group) VALUES
    ('${id}', '${type}', '${deadline}', ${is_obligatory}, ${is_group})`,
        (err) => {
            if (err) {
                console.error(
                    "Error while inserting assignment into the database:",
                    err,
                );
                ctx.body = { error: "Internal Server Error" };
                ctx.response.status = 500;
            } else {
                ctx.response.status = 201;
            }
        },
    );
});

coursesRouter.post("/:id/lectures", async (ctx) => {
    const { id } = ctx.params;

    const { date, start_time, end_time, location, is_obligatory } = ctx.request
        .body as {
        date: Date;
        start_time: string;
        end_time: string;
        location: string;
        is_obligatory: boolean;
    };

    db.run(
        `INSERT INTO lectures (course_id, date, start_time, end_time, location, is_obligatory) VALUES
    ('${id}', '${date}', '${start_time}', '${end_time}', '${location}', ${is_obligatory})`,
        (err) => {
            if (err) {
                console.error(
                    "Error while inserting lecture into the database:",
                    err,
                );
                ctx.body = { error: "Internal Server Error" };
                ctx.response.status = 500;
            } else {
                ctx.response.status = 201;
            }
        },
    );
});
