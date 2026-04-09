import { prisma } from '../config/prisma';

export interface CreateChordInput {
  blockId: string;
  chordName: string;
  rootNote: string;
  quality: string;
  durationMs?: number;
  detectedAt?: Date;
}

export const chordsRepository = {
  findAllByBlock(blockId: string) {
    return prisma.sessionChord.findMany({
      where: { blockId },
      orderBy: { detectedAt: 'asc' },
    });
  },

  createOne(data: CreateChordInput) {
    return prisma.sessionChord.create({ data });
  },

  createMany(chords: CreateChordInput[]) {
    return prisma.sessionChord.createManyAndReturn({ data: chords });
  },
};
