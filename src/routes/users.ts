import User from "../controllers/User";
import { Router } from "express";
import { AuthValidation } from "../middlewares/AuthValidation/AuthValidation";

// Import express interfaces
import { Express } from "express";

const usersRouter = (app: Express) => {
  const router = Router();

  router.get("/register", User.render);
  router.get("/login", User.render);

  // Post method (Register && Login)
  router.post("/register", AuthValidation.register, User.register);
  router.post("/login", AuthValidation.login, User.login);

  app.use("/", router);
};

export default usersRouter;
