import { Router } from 'express';
import {
    registerUser,
    loginUser,
    checkAdmin
} from '../controllers/auth.controller';
import { de } from 'zod/v4/locales';
import { authGuard } from '../middlewares/auth.middleware';
import prisma from '../client/prisma';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/check-admin', checkAdmin);
router.get('/me', authGuard, async (req, res) => {
    try {
        const userId = (req as any).user.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

export default router;
