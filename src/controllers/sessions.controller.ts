import { Request, Response, NextFunction } from 'express';
import { sessionsService } from '../services/sessions.service';
import { JwtPayload } from '../middlewares/auth.middleware';

// ── GET /sessions ─────────────────────────────────────────────────────────────
export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sub } = req.user as JwtPayload;
    const sessions = await sessionsService.getAll(sub);
    res.json({ sessions });
  } catch (err) {
    next(err);
  }
};

// ── GET /sessions/:id ─────────────────────────────────────────────────────────
export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sub } = req.user as JwtPayload;
    const session = await sessionsService.getById(req.params.id, sub);
    res.json({ session });
  } catch (err) {
    next(err);
  }
};

// ── POST /sessions ────────────────────────────────────────────────────────────
export const start = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sub } = req.user as JwtPayload;
    const { title } = req.body as { title?: string };

    const session = await sessionsService.start({ userId: sub, title });
    res.status(201).json({ session });
  } catch (err) {
    next(err);
  }
};

// ── PUT /sessions/:id ─────────────────────────────────────────────────────────
export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sub } = req.user as JwtPayload;
    const { title, detectedTonality, end } = req.body as {
      title?: string;
      detectedTonality?: string;
      end?: boolean;
    };

    const session = await sessionsService.update(req.params.id, sub, {
      title,
      detectedTonality,
      end,
    });
    res.json({ session });
  } catch (err) {
    next(err);
  }
};
