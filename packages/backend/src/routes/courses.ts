import Router from "koa-router";
import { getDbInstance } from "../database/db";

const db = getDbInstance();

export const coursesRouter = new Router({
  prefix: "/courses",
});

coursesRouter.get("/:id", async (ctx, next) => {
  const { id } = ctx.params;
  console.log("file: courses.ts~line: 11~id", id);

  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM courses WHERE id = ${id}`, [], (err, rows) => {
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
