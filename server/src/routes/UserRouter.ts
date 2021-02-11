import { Router } from "express";

import { UserController } from "../controllers";

export const UserRouter = (): Router => {
  const router = Router();

  router.get("/get", UserController.get);
  router.post("/set", UserController.set);

  return router;
};
