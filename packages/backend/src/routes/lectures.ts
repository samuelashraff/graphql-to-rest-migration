import Router from "koa-router";
import { getDbInstance } from "../database/db";

const db = getDbInstance();

export const lecturesRouter = new Router({
    prefix: "/lectures",
});

lecturesRouter.delete("/:id", async (ctx, _next) => {
    const { id } = ctx.params;

    try {
        await new Promise<void>((resolve, reject) => {
            db.run(`DELETE FROM lectures WHERE id = ${id}`, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log("Lecture deleted from database");
        ctx.status = 200;
    } catch (error) {
        console.error("Error while deleting lecture from database");
        ctx.status = 500;
        ctx.body = { error: "Internal Server Error" };
    }
});
