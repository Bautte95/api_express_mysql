"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = (0, express_1.Router)();
router.get('/', users_1.getAllUsers);
router.get('/:id', validationMiddleware_1.validateId, users_1.getUser);
router.post('/', validationMiddleware_1.validateUserBody, users_1.postUser);
router.put('/:id', validationMiddleware_1.validateId, users_1.putUser);
router.delete('/:id', validationMiddleware_1.validateId, users_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map