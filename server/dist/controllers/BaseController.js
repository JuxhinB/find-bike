"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
exports.BaseController = {
    helloWorld: (request, response, next) => {
        return response.json({
            message: `Hello ${request.query.name}`,
        });
    },
};
//# sourceMappingURL=BaseController.js.map