import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(404, `Ruta no encontrada: ${req.originalUrl}`));
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  // Error inesperado
  console.error(err);
  res.status(500).json({
    message: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && {
      detail: err instanceof Error ? err.message : String(err),
    }),
  });
};
