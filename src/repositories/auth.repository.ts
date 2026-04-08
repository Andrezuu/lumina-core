import { prisma } from '../config/prisma';

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  name?: string;
}

export const authRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  },

  create(data: CreateUserInput) {
    return prisma.user.create({ data });
  },
};
