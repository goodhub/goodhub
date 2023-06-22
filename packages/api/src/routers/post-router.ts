import { CustomError, ForbiddenError } from "../../../shared";
import { Router } from "express";
import {
  AuthorisationLevel,
  hasAuthorisation,
  verifyAuthentication,
} from "../helpers/auth";
import {
  addLikeToPost,
  getPost,
  addCommentToPost,
  publishPendingPosts,
  publishPost,
  updatePost,
} from "../services/post-service";
import { MissingParameterError } from "../common/errors";

const router = Router();

router.get("/:postId", async (req, res, next) => {
  const postId = req.params.postId;

  if (!postId) throw new MissingParameterError("postId");

  try {
    const post = await getPost(postId);
    res.status(200);
    res.json(post);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.put("/:postId", async (req, res, next) => {
  const post = req.body.post;
  const targets = req.body.targets;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, post.organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationMember))
      throw new ForbiddenError(
        "You need to be an organisation member to complete this operation."
      );

    const person = await updatePost(token.personId, post, targets);
    res.status(201);
    res.json(person);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post("/publish", async (req, res, next) => {
  try {
    const [, serverToServer] = await verifyAuthentication(req.headers);
    if (!serverToServer)
      throw new ForbiddenError(
        "This can only be performed by a server to server actor."
      );

    const result = await publishPendingPosts();
    res.status(200);
    res.json(result);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post("/:postId/publish", async (req, res, next) => {
  const postId = req.params.postId;

  if (!postId) throw new MissingParameterError("postId");

  try {
    const post = await getPost(postId);
    await publishPost(post);
    res.status(200);
    res.json(post);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post("/:postId/like", async (req, res, next) => {
  const postId = req.params.postId;

  if (!postId) throw new MissingParameterError("postId");

  try {
    const [token] = await verifyAuthentication(req.headers);
    const post = await addLikeToPost(token.personId, postId);
    res.status(200);
    res.json(post);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post("/:postId/comments", async (req, res, next) => {
  const postId = req.params.postId;
  if (!postId) throw new MissingParameterError("postId");

  const comment = req.body;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const response = await addCommentToPost(token.personId, postId, comment);
    res.status(200);
    res.json(response);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

export default router;
