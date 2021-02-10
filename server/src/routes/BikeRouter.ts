import { Router } from "express";

import { BikeController } from "../controllers";

export const BikeRouter = (): Router => {
  const router = Router();

  router.get("/getBikeList", BikeController.getBikeList);
  router.post("/rentBike", BikeController.rentBike);
  router.post("/returnBike", BikeController.returnBike);

  return router;
};
