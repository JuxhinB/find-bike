import { Router } from "express";

import { UserController } from "../controllers";

export const BikeRouter = (): Router => {
  const router = Router();

  router.get("/getUser", UserController.getUser);
  router.post("/setUser", UserController.setUser);

  return router;
};
