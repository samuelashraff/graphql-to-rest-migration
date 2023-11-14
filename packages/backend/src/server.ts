import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import {
    rootRouter,
    coursesRouter,
    lecturesRouter,
    assignmentsRouter,
    timeTableRouter,
} from "./routes";

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(rootRouter.routes());
app.use(coursesRouter.routes());
app.use(assignmentsRouter.routes());
app.use(lecturesRouter.routes());
app.use(timeTableRouter.routes());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Koa server is running on http://localhost:${PORT}`);
});
