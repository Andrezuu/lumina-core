import { Request, Response, NextFunction } from 'express';
import { chordsService, ChordInput } from '../services/chords.service';
import { JwtPayload } from '../middlewares/auth.middleware';

// ── POST /blocks/:blockId/chords ──────────────────────────────────────────────
// Acepta un solo acorde o un array (batch)
export const addChords = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { sub } = req.user as JwtPayload;
    const body = req.body as ChordInput | ChordInput[];
    const chords: ChordInput[] = Array.isArray(body) ? body : [body];

    if (chords.length === 0) {
      res.status(400).json({ message: 'Se requiere al menos un acorde' });
      return;
    }

    const invalid = chords.find((c) => !c.chordName || !c.rootNote || !c.quality);
    if (invalid) {
      res.status(400).json({ message: 'Cada acorde requiere chordName, rootNote y quality' });
      return;
    }

    const result = await chordsService.addToBlock(req.params.blockId, sub, chords);
    res.status(201).json({ chords: result });
  } catch (err) {
    next(err);
  }
};
