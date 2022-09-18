import Robot from "../controllers/Robots";
import { Router } from "express";

// Import express interfaces
import { Express } from "express";

const robotsRouter = (app: Express) => {
  const router = Router();
  const robot = new Robot();

  router.get("/list", robot.render);

  app.use("/robots", router);
};

export default robotsRouter;
