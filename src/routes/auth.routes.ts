import { Router } from 'express';
import { register, login, me } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', register);

// POST /api/v1/auth/login
router.post('/login', login);

// GET /api/v1/auth/me  🔒
router.get('/me', requireAuth, me);

export default router;
