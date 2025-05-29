import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack || err);
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor'
    });
};

export default errorHandler;
