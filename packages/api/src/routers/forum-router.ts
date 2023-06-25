import { Router } from 'express';
import { verifyAuthentication } from '../helpers/auth';
import { createForumPost, getForumPostsBySearch } from '../services/post-service';
import { CustomError, MissingParameterError } from '../common/errors';

const router = Router();

router.post('/', async (req, res, next) => {
  const post = req.body;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const person = await createForumPost(token.personId, post);
    res.status(201);
    res.json(person);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/', async (req, res, next) => {
  const search = req.query.search as string | undefined;

  try {
    if (!search) throw new MissingParameterError('search');
    const person = await getForumPostsBySearch(search);
    res.status(201);
    res.json(person);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

export default router;
