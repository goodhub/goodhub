import { Router } from 'express';
import { createInvite, getInvite, getInvitesByEmail, getInvitesByOrganisation, redeemInvite, revokeInvite } from '../services/invite-service';
import { verifyAuth } from '../helpers/auth';
import { createOrganisation } from '../services/organisation-service';

const router = Router()

router.post('/', async (req, res, next) => {
  const name = req.body?.name;

  try {
    await verifyAuth(req.headers);
    const organisation = await createOrganisation(name);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/:id/invites', async (req, res, next) => {
  const organisationId = req.params.id;
  const email = req.body?.email;

  try {
    await verifyAuth(req.headers);
    const invite = await createInvite(email, organisationId)
    res.status(200);
    res.json(invite)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id/invites', async (req, res, next) => {
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

router.get('/invites/:inviteId', async (req, res, next) => {
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

router.get('/invites', async (req, res, next) => {
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

router.post('/invites/:inviteId/redeem', async (req, res, next) => {
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

router.post('/invites/:inviteId/revoke', async (req, res, next) => {
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

export default router;