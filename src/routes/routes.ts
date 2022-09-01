import { Express } from "express";

import usersRoute from "./users";

const router = (app: Express) => {
  usersRoute(app);
};

export default router;
