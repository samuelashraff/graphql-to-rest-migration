import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { graphqlHTTP } from "koa-graphql";
import { schema } from "./routes";

const app = new Koa();

const gqlRouter = new Router();
gqlRouter.all(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.use(bodyParser());
app.use(cors());
app.use(gqlRouter.routes());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Koa server is running on http://localhost:${PORT}`);
});
