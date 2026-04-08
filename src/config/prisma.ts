import { PrismaClient } from '@prisma/client';
import { PrismaNeonHttp } from '@prisma/adapter-neon';
import { ENV } from './env';

function createPrismaClient() {
  const adapter = new PrismaNeonHttp(ENV.DATABASE_URL, {});
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (ENV.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
