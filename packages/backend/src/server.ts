import Koa from "koa";
import cors from "@koa/cors";

const app = new Koa();

app.use(cors());

let courses = require("./courses.ts");
app.use(courses.routes());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
});
