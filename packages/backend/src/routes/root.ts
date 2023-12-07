import Router from "koa-router";
import { getDbInstance } from "../database/db";

const db = getDbInstance();

export const createCourse = async (args: any) => {
    const { name, status, startDate, endDate } = args as {
        name: string,
        status: string,
        startDate: string,
        endDate: string
    }

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO courses (name, status, start_date, end_date) VALUES
        ('${name}', '${status}', ${startDate}, ${endDate})`,
            function (this, err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(this.lastID)
                }
            },
        );
    });
};

export const rootRouter = new Router({
    prefix: "/",
});

rootRouter.get("/", async (ctx, next) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM courses`, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        ctx.body = rows;
        ctx.status = 200;
    } catch (error) {
        console.error("Error while querying the database:", error);
        ctx.status = 500;
        ctx.body = { error: "Internal Server Error" };
    }
    next();
});

rootRouter.post("/", async (ctx) => {
    const { name, status, startDate, endDate } = ctx.request.body as {
        name: string;
        status: string;
        startDate: Date;
        endDate: Date;
    };

    db.run(
        `INSERT INTO courses (name, status, start_date, end_date) VALUES
    ('${name}', '${status}', ${startDate}, ${endDate})`,
        (err) => {
            if (err) {
                console.error(
                    "Error while inserting course into the database:",
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
