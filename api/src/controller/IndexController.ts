import { Router, Request, Response } from 'express';

const router = Router();

// GET /api
router.get('/', async (req: Request, res: Response) => {
  res.status(200).json('hello world!');
});

export default router;
