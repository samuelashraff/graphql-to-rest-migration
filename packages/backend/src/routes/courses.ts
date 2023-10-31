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

coursesRouter.delete("/:id", async (ctx, _next) => {
  const { id } = ctx.params;

  try {
    await new Promise((_resolve, reject) => {
      db.run(`DELETE FROM courses WHERE id = ${id}`, [], (err) => {
        if (err) {
          reject(err);
        }
      });
    });
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
