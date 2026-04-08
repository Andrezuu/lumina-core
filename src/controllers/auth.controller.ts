import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { JwtPayload } from '../middlewares/auth.middleware';

// ── POST /auth/register ───────────────────────────────────────────────────────
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, name } = req.body as {
      email: string;
      password: string;
      name?: string;
    };

    if (!email || !password) {
      res.status(400).json({ message: 'Email y contraseña son requeridos' });
      return;
    }

    const result = await authService.register({ email, password, name });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// ── POST /auth/login ──────────────────────────────────────────────────────────
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      res.status(400).json({ message: 'Email y contraseña son requeridos' });
      return;
    }

    const result = await authService.login({ email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// ── GET /auth/me ──────────────────────────────────────────────────────────────
export const me = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { sub } = req.user as JwtPayload;
    const user = await authService.getMe(sub);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

