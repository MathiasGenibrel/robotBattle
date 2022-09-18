import Shop from "../controllers/Shop";
import { Router } from "express";

// Import express interfaces
import { Express } from "express";

const shopRouter = (app: Express) => {
  const router = Router();

  router.get("/shop", Shop.render);

  // Post method (Register && Login)
  // router.post("/sell", Shop.register);
  // router.post("/buy", Shop.login);

  app.use("/", router);
};

export default shopRouter;
