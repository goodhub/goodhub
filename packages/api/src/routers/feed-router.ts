import { Router } from "express";
import {
  AuthorisationLevel,
  hasAuthorisation,
  verifyAuthentication,
} from "../helpers/auth";
import {
  createPost,
  getPopularPosts,
  getSocialPostsByOrganisation,
  getScheduledSocialPostsByOrganisation,
} from "../services/post-service";
import { ForbiddenError } from "../../../shared";
import { CustomError } from "../common/errors";

const router = Router();

router.post("/", async (req, res, next) => {
  const post = req.body.post;
  const targets = req.body.targets;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, post.organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationMember))
      throw new ForbiddenError(
        "You need to be an organisation member to complete this operation."
      );

    const person = await createPost(token.personId, post, targets);
    res.status(201);
    res.json(person);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get("/", async (req, res, next) => {
  const organisationId = req.query.organisationId as string;

  try {
    const posts = await getSocialPostsByOrganisation(organisationId);
    res.status(200);
    res.json(posts);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get("/scheduled", async (req, res, next) => {
  const organisationId = req.query.organisationId as string;

  try {
    const posts = await getScheduledSocialPostsByOrganisation(organisationId);
    res.status(200);
    res.json(posts);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get("/popular", async (req, res, next) => {
  try {
    const posts = await getPopularPosts();
    res.status(200);
    res.json(posts);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

export default router;
