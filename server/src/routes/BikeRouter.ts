import { Router } from "express";

import { BikeController } from "../controllers";

export const BikeRouter = (): Router => {
  const router = Router();

  router.post("/add", BikeController.add);
  router.get("/list", BikeController.list);
  router.post("/rent", BikeController.rent);
  router.post("/return", BikeController.return);

  return router;
};
