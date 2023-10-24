import Router from "koa-router";

const router = new Router({
  prefix: "/courses",
});

let courses = [
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

router.get("/", async (ctx, next) => {
  ctx.body = courses;
  next();
});

module.exports = router;
