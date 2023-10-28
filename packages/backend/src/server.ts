import Koa, { Context } from "koa";
import cors from "@koa/cors";
import Router from "koa-router";


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
  ctx.body = courses;
  next();
});

rootRouter.post("/courses", async (ctx) => {
  const { name, status, startDate, endDate } = ctx.request.query
  try {
    // A dummy version of inserting data using json-server named db.json in root of ./backend dir
    const newData = {
      name: name,
      status: status,
      start: startDate,
      end: endDate
    }

    // TODO: post data to DB

    ctx.response.status == 201
  } catch (e) {
    ctx.response.status = 500
  }
})

const app = new Koa();


app.use(cors());
app.use(rootRouter.routes());




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
});
