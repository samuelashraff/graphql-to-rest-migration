import Router from "koa-router";
import { getDbInstance } from "../database/db";

const db = getDbInstance();

export const coursesRouter = new Router({
  prefix: "/courses",
});

coursesRouter.get("/:id", async (ctx, next) => {
  const { id } = ctx.params;

  try {
    const rows = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM courses WHERE id = ${id}`, [], (err, rows) => {
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

coursesRouter.delete("/:id", async (ctx, next) => {
  const { id } = ctx.params

  try {
    await new Promise((resolve, reject) => {
      db.run(`DELETE FROM courses WHERE id = ${id}`, [], (err) => {
        if (err) {
          reject(err)
        }
      })
    })
    ctx.status = 200
  } catch (error) {
    console.error("Error while deleting course from database")
    ctx.status = 500
    ctx.body = { error: "Internal Server Error" }
  }
  next()
})
