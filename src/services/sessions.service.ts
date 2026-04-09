import { sessionsRepository } from '../repositories/sessions.repository';
import { AppError } from '../utils/AppError';

export interface StartSessionInput {
  userId: string;
  title?: string;
}

export interface UpdateSessionInput {
  title?: string;
  detectedTonality?: string;
  end?: boolean; // si true, setea endedAt = now
}

export const sessionsService = {
  async getAll(userId: string) {
    return sessionsRepository.findAllByUser(userId);
  },

  async getById(id: string, userId: string) {
    const session = await sessionsRepository.findById(id);
    if (!session) throw new AppError(404, 'Sesión no encontrada');
    if (session.userId !== userId) throw new AppError(403, 'No tienes acceso a esta sesión');
    return session;
  },

  async start(input: StartSessionInput) {
    return sessionsRepository.create({
      userId: input.userId,
      title: input.title,
    });
  },

  async update(id: string, userId: string, input: UpdateSessionInput) {
    const session = await sessionsRepository.belongsToUser(id, userId);
    if (!session) throw new AppError(404, 'Sesión no encontrada');
    if (session.endedAt) throw new AppError(409, 'La sesión ya fue finalizada');

    return sessionsRepository.update(id, {
      title: input.title,
      detectedTonality: input.detectedTonality,
      ...(input.end && { endedAt: new Date() }),
    });
  },
};
