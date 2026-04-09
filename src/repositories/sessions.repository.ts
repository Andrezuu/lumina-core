import { prisma } from '../config/prisma';

export interface CreateSessionInput {
  userId: string;
  title?: string;
}

export interface UpdateSessionInput {
  title?: string;
  detectedTonality?: string;
  endedAt?: Date;
}

export const sessionsRepository = {
  findAllByUser(userId: string) {
    return prisma.practiceSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      include: { blocks: { orderBy: { blockOrder: 'asc' } } },
    });
  },

  findById(id: string) {
    return prisma.practiceSession.findUnique({
      where: { id },
      include: {
        blocks: {
          orderBy: { blockOrder: 'asc' },
          include: { chords: { orderBy: { detectedAt: 'asc' } } },
        },
      },
    });
  },

  create(data: CreateSessionInput) {
    return prisma.practiceSession.create({ data });
  },

  update(id: string, data: UpdateSessionInput) {
    return prisma.practiceSession.update({ where: { id }, data });
  },

  belongsToUser(id: string, userId: string) {
    return prisma.practiceSession.findFirst({ where: { id, userId } });
  },
};
