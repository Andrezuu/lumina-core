import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';
import authRoutes from './auth.routes';
import sessionsRoutes from './sessions.routes';
import blocksRoutes from './blocks.routes';

const router = Router();

// ── Módulos ───────────────────────────────────────────────────────────────────
router.get('/health', healthCheck);        // GET  /api/v1/health
router.use('/auth', authRoutes);           // /api/v1/auth/*
router.use('/sessions', sessionsRoutes);   // /api/v1/sessions/*
router.use('/blocks', blocksRoutes);       // /api/v1/blocks/*

export default router;
