import Koa from "koa";
import cors from "@koa/cors";

const app = new Koa();

app.use(cors());

app.use(async (ctx) => {
  ctx.body = {
    data: "Data from server",
  };
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
});
