import { Request, Response, NextFunction } from "express";
import {  check, validationResult, param } from "express-validator";


export const validateId = [
    param('id').isInt().withMessage('El id debe ser un numero entero'),
    (req:Request, res:Response, next:NextFunction) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});

            next();
        } catch (error) {

            next(error)
        }
    }
];

export const validateUserBody = [
    check('name')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 3, max: 70 }).withMessage('El nombre debe tener entre 3 y 70 caracteres'),
    check('email')
        .isEmail().withMessage('Debe ingresar un email valido'),
    check('state')
        .optional()
        .isBoolean().withMessage('El estado debe ser 1 o 0'),

    (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
        } catch (error) {

            next(error)
        }
    }
];