import { Router } from 'express';
import { handleUserSignUp } from '../services/iam-service';
import { CustomError } from '../common/errors';

const router = Router();

router.post('/sign-up', async (req, res, next) => {
  const email = req.body?.email as string;

  try {
    const response = await handleUserSignUp(email);
    res.status(200);
    res.json(response);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

export default router;
