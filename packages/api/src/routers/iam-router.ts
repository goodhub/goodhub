import { Router } from 'express';
import { handleUserSignUp } from '../services/iam-service';

const router = Router()

router.post('/sign-up', async (req, res, next) => {
  const email = req.body?.email as string;

  try {
    const response = await handleUserSignUp(email);
    res.status(200);
    res.json(response)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;