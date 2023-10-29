import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { rootRouter } from "./routes";

// routes: ADD THESE AS NEEDED
// main (/) -> course list
// course (/course/:id)
// assignment (/assignment/:id)
// lecture (/lecture/:id)

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(rootRouter.routes());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
});
