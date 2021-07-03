import { Router } from 'express';
import { verifyAuthentication } from '../helpers/auth';
import { addLikeToPost, getPost, addCommentToPost } from '../services/post-service';

const router = Router()

router.get('/:postId', async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await getPost(postId);
    res.status(200);
    res.json(post)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/:postId/like', async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const post = await addLikeToPost(token.personId, postId);
    res.status(200);
    res.json(post)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/:postId/comments', async (req, res, next) => {
  const postId = req.params.postId;
  const comment = req.body;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const response = await addCommentToPost(token.personId, postId, comment);
    res.status(200);
    res.json(response)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;