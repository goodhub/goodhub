import { Router } from 'express';
import { createComment, getCommentsForPost } from '../services/comment-service';

import { verifyAuth } from '../helpers/auth';
import { addLikeToPost, createPost, getPopularPosts, getPost } from '../services/post-service';

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
    const [token] = await verifyAuth(req.headers);
    const post = await addLikeToPost(token.personId, postId);
    res.status(200);
    res.json(post)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:postId/comments', async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const comments = await getCommentsForPost(postId);
    res.status(200);
    res.json(comments)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/:postId/comments', async (req, res, next) => {
  const postId = req.params.postId;
  const comment = req.body;

  try {
    const [token] = await verifyAuth(req.headers);
    const response = await createComment(token.personId, postId, comment);
    res.status(200);
    res.json(response)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;