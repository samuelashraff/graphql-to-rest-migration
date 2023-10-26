import Koa from "koa";
import cors from "@koa/cors";
import Router from "koa-router";
import db from "./database/db";

const sqliteDB = db();
// routes: ADD THESE AS NEEDED
// main (/) -> course list
// course (/course/:id)
// assignment (/assignment/:id)
// lecture (/lecture/:id)

const courses = [
  { id: 100, cname: "Design of WWW Services", status: "In progress" },
  { id: 101, cname: "Calculus 1", status: "Not started" },
  { id: 102, cname: "WWW Applications", status: "In progress" },
  {
    id: 103,
    cname:
      "Social theory of finance: the giving and taking of value in the financialisation of our lives",
    status: "Completed",
  },
];

const rootRouter = new Router({
  prefix: "/",
});

rootRouter.get("/", async (ctx, next) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      sqliteDB.all(`SELECT * FROM courses`, [], (err, rows) => {
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

const app = new Koa();

app.use(cors());
app.use(rootRouter.routes());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
});
