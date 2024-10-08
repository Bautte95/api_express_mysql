import { Request, Response, NextFunction  } from "express";

interface CustomError extends Error {
    status?:number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        msg: err.message || 'Internal server Error',
    })
}