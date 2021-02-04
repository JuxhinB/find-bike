import { Router } from "express";

import { BaseController } from "../controllers";

export const BaseRouter = (): Router => {
    const router = Router();

    router.get('/hello', BaseController.helloWorld);
    // router.post('/hello', BaseController.helloWorld);

    return router;
}