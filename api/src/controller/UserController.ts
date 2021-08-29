import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

// GET /api/users
router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json({ users });
});

export default router;
