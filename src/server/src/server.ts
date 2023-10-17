import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello, Koa with TypeScript!';
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
})
