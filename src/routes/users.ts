import User from "../controllers/User";
import { Router } from "express";
import { AuthValidation } from "../middlewares/AuthValidation/AuthValidation";

// Import express interfaces
import { Express } from "express";

const usersRouter = (app: Express) => {
  const router = Router();

  router.get("/register", AuthValidation.userConnected, User.render.register);
  router.get("/login", AuthValidation.userConnected, User.render.login);
  router.get("/profile", User.render.profile); // TODO add middleware to check if the user is connected

  // Post method (Register && Login)
  router.post("/register", AuthValidation.register, User.register);
  router.post("/login", AuthValidation.login, User.login);

  app.use("/", router);
};

export default usersRouter;
