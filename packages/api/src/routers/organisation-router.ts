import { Router } from 'express';
import { ForbiddenError } from '../../../shared';

import { verifyAuthentication, hasAuthorisation, AuthorisationLevel } from '../helpers/auth';
import {
  acceptInvite,
  createInvite,
  getInvite,
  getInvitesByEmail,
  getInvitesByOrganisation,
  redeemInvite,
  revokeInvite
} from '../services/invite-service';
import {
  createOrganisation,
  getOrganisation,
  updateOrganisation,
  getOrganisationProfile,
  getWebsiteConfiguration,
  updateWebsiteConfiguration,
  removePerson,
  getOrganisationSensitiveInfo,
  getExtendedOrganisation
} from '../services/organisation-service';
import { createProject, getProject, getProjectsByOrganisation } from '../services/project-service';
import { getVolunteersForOrganisation } from '../services/volunteer-service';
import { CustomError, MissingParameterError } from '../common/errors';

const router = Router();

router.post('/', async (req, res) => {
  const candidate = req.body;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const organisation = await createOrganisation(token.personId, candidate);
    res.status(201);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/invites/:inviteId', async (req, res) => {
  const inviteId = req.params.inviteId;
  if (!inviteId) throw new MissingParameterError('inviteId');

  try {
    const invite = await getInvite(inviteId);
    res.status(200);
    res.json(invite);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/invites', async (req, res) => {
  const email = req.query['email'] as string;

  try {
    await verifyAuthentication(req.headers);
    const invites = await getInvitesByEmail(email);
    res.status(200);
    res.json(invites);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post('/invites/:inviteId/redeem', async (req, res) => {
  const inviteId = req.params?.inviteId;
  const personId = req.body?.personId;

  if (!inviteId) throw new MissingParameterError('inviteId');

  try {
    await verifyAuthentication(req.headers);
    const invite = await redeemInvite(inviteId, personId);
    res.status(200);
    res.json(invite);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post('/invites/:inviteId/accept', async (req, res) => {
  const inviteId = req.params?.inviteId;

  if (!inviteId) throw new MissingParameterError('inviteId');

  try {
    const [token] = await verifyAuthentication(req.headers);
    const email = token.emails?.[0];
    if (!email) throw new ForbiddenError('No email found on token');
    const invite = await acceptInvite(inviteId, token.personId, email);
    res.status(200);
    res.json(invite);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.delete('/invites/:inviteId', async (req, res) => {
  const inviteId = req.params.inviteId;

  if (!inviteId) throw new MissingParameterError('inviteId');

  try {
    await verifyAuthentication(req.headers);
    const invite = await revokeInvite(inviteId);
    res.status(200);
    res.json(invite);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id', async (req, res) => {
  const organisationId = req.params.id;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const organisation = await getOrganisation(organisationId);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id/extended', async (req, res) => {
  const organisationId = req.params.id;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationMember))
      throw new ForbiddenError('You need to be an organisation member to complete this operation.');

    const organisation = await getExtendedOrganisation(organisationId);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id/sensitive', async (req, res) => {
  const organisationId = req.params.id;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationAdmin))
      throw new ForbiddenError('You need to be an organisation admin to complete this operation.');

    const organisation = await getOrganisationSensitiveInfo(organisationId);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id/profile', async (req, res) => {
  const organisationId = req.params.id;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const organisation = await getOrganisationProfile(organisationId);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.put('/:id', async (req, res) => {
  const organisationId = req.params.id;
  const candidate = req.body;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationAdmin))
      throw new ForbiddenError('You need to be an organisation admin to complete this operation.');

    const organisation = await updateOrganisation(organisationId, candidate);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id/website', async (req, res) => {
  const idOrDomainOrSlug = req.params.id;

  if (!idOrDomainOrSlug) throw new MissingParameterError('idOrDomainOrSlug');

  try {
    const organisation = await getWebsiteConfiguration(idOrDomainOrSlug);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.put('/:id/website', async (req, res) => {
  const organisationId = req.params.id;
  const candidate = req.body;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationMember))
      throw new ForbiddenError('You need to be an organisation admin to complete this operation.');

    const organisation = await updateWebsiteConfiguration(organisationId, candidate);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.delete('/:id/members/:personId', async (req, res) => {
  const organisationId = req.params.id;
  const personId = req.params.personId;

  if (!organisationId) throw new MissingParameterError('organisationId');
  if (!personId) throw new MissingParameterError('personId');

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationAdmin))
      throw new ForbiddenError('You need to be an organisation admin to complete this operation.');

    const organisation = await removePerson(organisationId, personId);
    res.status(200);
    res.json(organisation);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id/projects', async (req, res) => {
  const id = req.params.id;

  if (!id) throw new MissingParameterError('id');

  try {
    const projects = await getProjectsByOrganisation(id);
    res.status(200);
    res.json(projects);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id/projects/:projectId', async (req, res) => {
  const projectId = req.params.projectId;

  if (!projectId) throw new MissingParameterError('projectId');

  try {
    const project = await getProject(projectId);
    res.status(200);
    res.json(project);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post('/:id/projects', async (req, res) => {
  const organisationId = req.params.id;
  const candidate = req.body;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationAdmin))
      throw new ForbiddenError('You need to be an organisation admin to complete this operation.');

    const project = await createProject(organisationId, token.personId, candidate);
    res.status(200);
    res.json(project);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post('/:id/invites', async (req, res) => {
  const organisationId = req.params.id;
  const email = req.body?.email;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const [token] = await verifyAuthentication(req.headers);
    const permissions = hasAuthorisation(token, organisationId);
    if (!permissions.includes(AuthorisationLevel.OrganisationAdmin))
      throw new ForbiddenError('You need to be an organisation admin to complete this operation.');

    const invite = await createInvite(email, organisationId);
    res.status(201);
    res.json(invite);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id/invites', async (req, res) => {
  const organisationId = req.params.id;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    await verifyAuthentication(req.headers);
    const invites = await getInvitesByOrganisation(organisationId);
    res.status(200);
    res.json(invites);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/:id/volunteers', async (req, res) => {
  const organisationId = req.params.id;

  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    await verifyAuthentication(req.headers);
    const volunteers = await getVolunteersForOrganisation(organisationId);
    res.status(200);
    res.json(volunteers);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

export default router;
