import { blocksRepository } from '../repositories/blocks.repository';
import { sessionsRepository } from '../repositories/sessions.repository';
import { AppError } from '../utils/AppError';

export interface CreateBlockInput {
  label: string;
  keyCenter?: string;
}

export const blocksService = {
  async getAllBySession(sessionId: string, userId: string) {
    const session = await sessionsRepository.belongsToUser(sessionId, userId);
    if (!session) throw new AppError(404, 'Sesión no encontrada');
    return blocksRepository.findAllBySession(sessionId);
  },

  async create(sessionId: string, userId: string, input: CreateBlockInput) {
    const session = await sessionsRepository.belongsToUser(sessionId, userId);
    if (!session) throw new AppError(404, 'Sesión no encontrada');
    if (session.endedAt) throw new AppError(409, 'No se pueden añadir bloques a una sesión finalizada');

    const count = await blocksRepository.countBySession(sessionId);

    return blocksRepository.create({
      sessionId,
      label: input.label,
      blockOrder: count + 1,
      keyCenter: input.keyCenter,
    });
  },
};
