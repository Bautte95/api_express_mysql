"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserBody = exports.validateId = void 0;
const express_validator_1 = require("express-validator");
exports.validateId = [
    (0, express_validator_1.param)('id').isInt().withMessage('El id debe ser un numero entero'),
    (req, res, next) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });
            next();
        }
        catch (error) {
            next(error);
        }
    }
];
exports.validateUserBody = [
    (0, express_validator_1.check)('name')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 3, max: 70 }).withMessage('El nombre debe tener entre 3 y 70 caracteres'),
    (0, express_validator_1.check)('email')
        .isEmail().withMessage('Debe ingresar un email valido'),
    (0, express_validator_1.check)('state')
        .optional()
        .isBoolean().withMessage('El estado debe ser 1 o 0'),
    (req, res, next) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });
            next();
        }
        catch (error) {
            next(error);
        }
    }
];
//# sourceMappingURL=validationMiddleware.js.map