import { chordsRepository, CreateChordInput } from '../repositories/chords.repository';
import { blocksRepository } from '../repositories/blocks.repository';
import { sessionsRepository } from '../repositories/sessions.repository';
import { AppError } from '../utils/AppError';

export interface ChordInput {
  chordName: string;
  rootNote: string;
  quality: string;
  durationMs?: number;
  detectedAt?: string; // ISO string desde el cliente
}

export const chordsService = {
  async addToBlock(blockId: string, userId: string, chords: ChordInput[]) {
    const block = await blocksRepository.findById(blockId);
    if (!block) throw new AppError(404, 'Bloque no encontrado');

    const session = await sessionsRepository.belongsToUser(block.sessionId, userId);
    if (!session) throw new AppError(403, 'No tienes acceso a este bloque');
    if (session.endedAt) throw new AppError(409, 'La sesión ya fue finalizada');

    const data: CreateChordInput[] = chords.map((c) => ({
      blockId,
      chordName: c.chordName,
      rootNote: c.rootNote,
      quality: c.quality,
      durationMs: c.durationMs,
      detectedAt: c.detectedAt ? new Date(c.detectedAt) : undefined,
    }));

    if (data.length === 1) {
      return [await chordsRepository.createOne(data[0])];
    }

    return chordsRepository.createMany(data);
  },
};
