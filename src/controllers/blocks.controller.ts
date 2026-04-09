import { Request, Response, NextFunction } from 'express';
import { blocksService } from '../services/blocks.service';
import { JwtPayload } from '../middlewares/auth.middleware';

// ── GET /sessions/:sessionId/blocks ───────────────────────────────────────────
export const getAllBySession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { sub } = req.user as JwtPayload;
    const blocks = await blocksService.getAllBySession(req.params.sessionId, sub);
    res.json({ blocks });
  } catch (err) {
    next(err);
  }
};

// ── POST /sessions/:sessionId/blocks ──────────────────────────────────────────
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sub } = req.user as JwtPayload;
    const { label, keyCenter } = req.body as { label: string; keyCenter?: string };

    if (!label) {
      res.status(400).json({ message: 'El campo label es requerido' });
      return;
    }

    const block = await blocksService.create(req.params.sessionId, sub, { label, keyCenter });
    res.status(201).json({ block });
  } catch (err) {
    next(err);
  }
};
