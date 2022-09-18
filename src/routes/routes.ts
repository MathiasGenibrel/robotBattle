import { Express } from "express";

import usersRoute from "./users";
import robotsRoute from "./robots";
import shopRoute from "./shop";

const router = (app: Express) => {
  usersRoute(app);
  robotsRoute(app);
  shopRoute(app);
};

export default router;
