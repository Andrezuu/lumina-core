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

  // History: solo sesiones finalizadas, con bloques y acordes anidados
  findHistoryByUser(userId: string) {
    return prisma.practiceSession.findMany({
      where: { userId, endedAt: { not: null } },
      orderBy: { startedAt: 'desc' },
      include: {
        blocks: {
          orderBy: { blockOrder: 'asc' },
          include: { chords: { orderBy: { detectedAt: 'asc' } } },
        },
      },
    });
  },

  // Stats: conteos y tonalidades agregadas en una sola query
  async getStatsByUser(userId: string) {
    const [totalSessions, totalChords, editedChords, tonalities] = await Promise.all([
      // Total de sesiones finalizadas
      prisma.practiceSession.count({
        where: { userId, endedAt: { not: null } },
      }),

      // Total de acordes en sesiones finalizadas del usuario
      prisma.sessionChord.count({
        where: {
          block: { session: { userId, endedAt: { not: null } } },
        },
      }),

      // Total de acordes editados
      prisma.sessionChord.count({
        where: {
          wasEdited: true,
          block: { session: { userId, endedAt: { not: null } } },
        },
      }),

      // Tonalidades detectadas para calcular la favorita
      prisma.practiceSession.findMany({
        where: { userId, endedAt: { not: null }, detectedTonality: { not: null } },
        select: { detectedTonality: true },
      }),
    ]);

    // Tonalidad favorita: la que más aparece
    const tonalityMap = new Map<string, number>();
    for (const s of tonalities) {
      const t = s.detectedTonality!;
      tonalityMap.set(t, (tonalityMap.get(t) ?? 0) + 1);
    }
    const favoriteTonality =
      tonalityMap.size > 0
        ? [...tonalityMap.entries()].sort((a, b) => b[1] - a[1])[0][0]
        : null;

    return { totalSessions, totalChords, editedChords, favoriteTonality };
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

