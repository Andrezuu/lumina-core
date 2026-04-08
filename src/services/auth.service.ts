import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authRepository } from '../repositories/auth.repository';
import { AppError } from '../utils/AppError';
import { ENV } from '../config/env';

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function signToken(userId: string, email: string): string {
  return jwt.sign(
    { sub: userId, email },
    ENV.JWT_SECRET,
    { expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] },
  );
}

// ── Service ───────────────────────────────────────────────────────────────────

export const authService = {
  async register(input: RegisterInput): Promise<AuthResult> {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) throw new AppError(409, 'El email ya está registrado');

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await authRepository.create({
      email: input.email,
      passwordHash,
      name: input.name,
    });

    const token = signToken(user.id, user.email);
    return {
      token,
      user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    };
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await authRepository.findByEmail(input.email);
    if (!user) throw new AppError(401, 'Credenciales inválidas');

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) throw new AppError(401, 'Credenciales inválidas');

    const token = signToken(user.id, user.email);
    return {
      token,
      user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    };
  },

  async getMe(userId: string) {
    const user = await authRepository.findById(userId);
    if (!user) throw new AppError(404, 'Usuario no encontrado');
    return user;
  },
};
