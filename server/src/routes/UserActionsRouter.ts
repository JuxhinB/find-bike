import { Router } from "express";

import { UserActionsController } from "../controllers";

export const UserActionsRouter = (): Router => {
  const router = Router();

  router.post("/list", UserActionsController.list);

  return router;
};
