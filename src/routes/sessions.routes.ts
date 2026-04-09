import { Router } from 'express';
import { getAll, getById, start, update } from '../controllers/sessions.controller';
import { getAllBySession, create as createBlock } from '../controllers/blocks.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de sesiones requieren auth
router.use(requireAuth);

// GET  /api/v1/sessions
router.get('/', getAll);

// GET  /api/v1/sessions/:id
router.get('/:id', getById);

// POST /api/v1/sessions
router.post('/', start);

// PUT  /api/v1/sessions/:id
router.put('/:id', update);

// GET  /api/v1/sessions/:sessionId/blocks
router.get('/:sessionId/blocks', getAllBySession);

// POST /api/v1/sessions/:sessionId/blocks
router.post('/:sessionId/blocks', createBlock);

export default router;
