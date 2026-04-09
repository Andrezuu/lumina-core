import { prisma } from '../config/prisma';

export interface CreateBlockInput {
  sessionId: string;
  label: string;
  blockOrder: number;
  keyCenter?: string;
}

export const blocksRepository = {
  findAllBySession(sessionId: string) {
    return prisma.songBlock.findMany({
      where: { sessionId },
      orderBy: { blockOrder: 'asc' },
      include: { chords: { orderBy: { detectedAt: 'asc' } } },
    });
  },

  findById(id: string) {
    return prisma.songBlock.findUnique({
      where: { id },
      include: { chords: { orderBy: { detectedAt: 'asc' } } },
    });
  },

  create(data: CreateBlockInput) {
    return prisma.songBlock.create({ data });
  },

  countBySession(sessionId: string) {
    return prisma.songBlock.count({ where: { sessionId } });
  },

  belongsToSession(id: string, sessionId: string) {
    return prisma.songBlock.findFirst({ where: { id, sessionId } });
  },
};
