import { getDbInstance } from "../database/db";

const db = getDbInstance();

export const coursesRouter = new Router({
  prefix: "/courses",
});

coursesRouter.get("/:id", async (ctx, next) => {
  // get individual course from db
  const { id } = ctx.params;

  db.get(`SELECT * FROM courses WHERE id = ${id}`, (err, row) => {
    if (err) {
      console.error("Error while querying the database:", err);
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    } else {
      ctx.body = row;
      ctx.status = 200;
    }
  });
});
