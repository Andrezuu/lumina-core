import { Request, Response } from 'express';

export const healthCheck = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: 'Lumina API is up and running 🚀',
    timestamp: new Date().toISOString(),
  });
};
