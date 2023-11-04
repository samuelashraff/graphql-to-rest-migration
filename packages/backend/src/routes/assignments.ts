import Router from "koa-router";
import { getDbInstance } from "../database/db";

const db = getDbInstance();

export const assignmentsRouter = new Router({
    prefix: "/assignments",
});

assignmentsRouter.delete("/:id", async (ctx, _next) => {
    const { id } = ctx.params;

    try {
        await new Promise<void>((resolve, reject) => {
            db.run(`DELETE FROM assignments WHERE id = ${id}`, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log("Assignment deleted from database");
        ctx.status = 200;
    } catch (error) {
        console.error("Error while deleting assignment from database");
        ctx.status = 500;
        ctx.body = { error: "Internal Server Error" };
    }
});
