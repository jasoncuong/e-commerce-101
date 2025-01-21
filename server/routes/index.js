const userRouter = require("./user");
const { notFound, errHandler } = require("../middlewares/errorHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  //Xu ly loi
  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
