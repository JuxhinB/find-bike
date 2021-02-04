"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const BaseRouter = () => {
    const router = express_1.Router();
    router.get('/hello', controllers_1.BaseController.helloWorld);
    // router.post('/hello', BaseController.helloWorld);
    return router;
};
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map