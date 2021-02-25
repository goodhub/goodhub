import { Router } from 'express';
import { verifyAuth } from '../helpers/auth';
import { createOrganisation } from '../services/organisation-service';

const router = Router()

router.post('/', async (req, res, next) => {
  const name = req.body?.name;

  try {
    await verifyAuth(req.headers);
    const example = await createOrganisation(name)
    res.status(200);
    res.json(example)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;