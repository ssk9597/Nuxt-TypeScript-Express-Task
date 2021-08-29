import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

// POST /api/tasks/store
router.post('/store', async (req: Request, res: Response) => {
  await prisma.task.create({
    data: {
      content: req.body.task.content,
      isFinished: req.body.task.isFinished,
    },
  });
});

export default router;
