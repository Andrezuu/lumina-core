import { Router } from 'express';
import { addChords } from '../controllers/chords.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de bloques requieren auth
router.use(requireAuth);

// POST /api/v1/blocks/:blockId/chords  (unitario o batch)
router.post('/:blockId/chords', addChords);

export default router;
