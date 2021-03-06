import { Router } from 'express';

import { verifyAuth } from '../helpers/auth';
import { createPost, getPopularPosts } from '../services/post-service';

const router = Router()

router.post('/', async (req, res, next) => {
  const post = req.body;

  try {
    const [token] = await verifyAuth(req.headers);
    const person = await createPost(token.personId, post);
    res.status(201);
    res.json(person)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/popular', async (req, res, next) => {

  try {
    const posts = await getPopularPosts()
    res.status(200);
    res.json(posts)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;