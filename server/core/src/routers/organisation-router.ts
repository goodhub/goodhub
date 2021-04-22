import { Router } from 'express';
import { createInvite, getInvite, getInvitesByEmail, getInvitesByOrganisation, redeemInvite, revokeInvite } from '../services/invite-service';
import { verifyAuth } from '../helpers/auth';
import { createOrganisation, getOrganisation, getWebsiteConfiguration, updateWebsiteConfiguration } from '../services/organisation-service';
import { createProject, getProject, getProjectsByOrganisation } from '../services/project-service';

const router = Router()

router.post('/', async (req, res) => {
  const name = req.body?.name;

  try {
    const [token] = await verifyAuth(req.headers);
    const organisation = await createOrganisation(name, token.personId);
    res.status(201);
    res.json(organisation);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/invites/:inviteId', async (req, res) => {
  const inviteId = req.params.inviteId;

  try {
    await verifyAuth(req.headers);
    const invite = await getInvite(inviteId);
    res.status(200);
    res.json(invite)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/invites', async (req, res) => {
  const email = req.query['email'] as string;

  try {
    await verifyAuth(req.headers);
    const invites = await getInvitesByEmail(email);
    res.status(200);
    res.json(invites)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/invites/:inviteId/redeem', async (req, res) => {
  const inviteId = req.params?.inviteId;
  const personId = req.body?.personId;

  try {
    await verifyAuth(req.headers);
    const invite = await redeemInvite(inviteId, personId);
    res.status(200);
    res.json(invite)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.delete('/invites/:inviteId', async (req, res) => {
  const inviteId = req.params.inviteId;

  try {
    await verifyAuth(req.headers);
    const invite = await revokeInvite(inviteId);
    res.status(200);
    res.json(invite)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id', async (req, res) => {
  const organisationId = req.params.id;

  try {
    const organisation = await getOrganisation(organisationId);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id/website', async (req, res) => {
  const idOrDomainOrSlug = req.params.id;

  try {
    const organisation = await getWebsiteConfiguration(idOrDomainOrSlug);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/:id/website', async (req, res) => {
  const id = req.params.id;
  const candidate = req.body;

  try {
    await verifyAuth(req.headers);
    const organisation = await updateWebsiteConfiguration(id, candidate);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id/projects', async (req, res) => {
  const id = req.params.id;

  try {
    const projects = await getProjectsByOrganisation(id);
    res.status(200);
    res.json(projects);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id/projects/:projectId', async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await getProject(projectId);
    res.status(200);
    res.json(project);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/:id/projects', async (req, res) => {
  const organisationId = req.params.id;
  const candidate = req.body;

  try {
    const [token] = await verifyAuth(req.headers);
    const project = await createProject(organisationId, token.personId, candidate);
    res.status(200);
    res.json(project);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/:id/invites', async (req, res) => {
  const organisationId = req.params.id;
  const email = req.body?.email;

  try {
    await verifyAuth(req.headers);
    const invite = await createInvite(email, organisationId)
    res.status(201);
    res.json(invite)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id/invites', async (req, res) => {
  const organisationId = req.params.id;

  try {
    await verifyAuth(req.headers);
    const invites = await getInvitesByOrganisation(organisationId)
    res.status(200);
    res.json(invites)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;