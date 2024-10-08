"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        msg: err.message || 'Internal server Error',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandlerMiddleware.js.map