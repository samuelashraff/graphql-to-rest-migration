import Koa, { Context } from "koa";
import cors from "@koa/cors";
import Router from "koa-router";
import db from "./database/db";
import bodyParser from "koa-bodyparser";

const sqliteDB = db();
// routes: ADD THESE AS NEEDED
// main (/) -> course list
// course (/course/:id)
// assignment (/assignment/:id)
// lecture (/lecture/:id)

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

rootRouter.post("/", async (ctx) => {
  const { name, status, startDate, endDate } = ctx.request.body as {name: string, status: string, startDate: Date, endDate: Date}

  sqliteDB.run(
    `INSERT INTO courses (name, status, start_date, end_date) VALUES
    ('${name}', '${status}', ${startDate}, ${endDate})`, (err) => {
      if(err) {
        console.error("Error while inserting course into the database:", err);
        ctx.body = { error: "Internal Server Error" };
        ctx.response.status = 500;
      }
      else {
        ctx.response.status = 201
      }
    }
  )
})

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(rootRouter.routes());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
});
