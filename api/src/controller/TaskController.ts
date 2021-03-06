import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

// GET /api/tasks
router.get('/', async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.status(200).json({ tasks });
});

// POST /api/tasks/store
router.post('/store', async (req: Request, res: Response) => {
  await prisma.task.create({
    data: {
      content: req.body.task.content,
      isFinished: req.body.task.isFinished,
    },
  });
});

// POST /api/tasks/delete
router.post('/delete', async (req: Request, res: Response) => {
  const id: number = req.body.id;
  await prisma.task.delete({
    where: {
      id: id,
    },
  });
});

// POST /api/tasks/update
router.post('/update', async (req: Request, res: Response) => {
  const id: number = req.body.id;
  const isFinished: boolean = req.body.isFinished;

  await prisma.task.update({
    where: { id: id },
    data: { isFinished: !isFinished },
  });
});

export default router;
