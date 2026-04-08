import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';
import authRoutes from './auth.routes';

const router = Router();

// ── Módulos ───────────────────────────────────────────────────────────────────
router.get('/health', healthCheck);   // GET /api/v1/health
router.use('/auth', authRoutes);      // /api/v1/auth/*

export default router;
