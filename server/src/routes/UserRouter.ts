import { Router } from "express";

import { UserController } from "../controllers";

export const UserRouter = (): Router => {
  const router = Router();

  router.post("/login", UserController.login);
  router.post("/get", UserController.get);
  router.post("/register", UserController.register);

  return router;
};
