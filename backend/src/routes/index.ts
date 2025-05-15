import { Router } from 'express';
import authRouter from './auth';
import guildsRouter from './guilds';
import statistics from './statistics';

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);
router.use('/statistics', statistics);

export default router;