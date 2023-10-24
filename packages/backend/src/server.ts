import Koa, { Context } from "koa";
import cors from "@koa/cors";
import Router from "@koa/router";

const app = new Koa();
const router = new Router()


app.use(cors());

app.use(async (ctx) => {
  ctx.body = {
    data: "Data from server",
  };
});


router.post("/course", async (ctx) => {
  const { name, status, startDate, endDate } = ctx.request.query
  try {
    // A dummy version of inserting data using json-server named db.json in root of ./backend dir
    const newData = {
      name: name,
      status: status,
      start: startDate,
      end: endDate
    }

    ctx.response.status == 201
    ctx.response.body = {
      message: "Course created successfully"
    }
  } catch (e) {
    ctx.response.status = 500
  }
})


app.use(router.routes())

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
});
