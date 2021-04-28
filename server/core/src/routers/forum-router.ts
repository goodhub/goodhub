import { Router } from 'express';
import { verifyAuthentication } from '../helpers/auth';
import { createForumPost, getForumPostsBySearch } from '../services/post-service';

const router = Router()

router.post('/', async (req, res, next) => {
  const post = req.body;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const person = await createForumPost(token.personId, post);
    res.status(201);
    res.json(person)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/', async (req, res, next) => {
  const search = req.query.search as string | undefined;

  try {
    const person = await getForumPostsBySearch(search);
    res.status(201);
    res.json(person)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;