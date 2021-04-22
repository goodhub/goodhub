import db from  './database-client';
import { Model } from 'sequelize';

import * as Sentry from '@sentry/node';
import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError, BadRequestError, CustomError, NotFoundError } from '../common/errors';
import { syncOptions, requiredString } from '../helpers/db';
import { sendEmail, EmailType } from '../helpers/email';
import { addPersonToOrganisation, getOrganisation } from './organisation-service';
import { addOrganisationToPerson } from './person-service';
import { getSetting } from '../helpers/backstage';
import fetch from 'node-fetch';

class Invite extends Model {}

interface IInvite {
  id: string
  email: string
  organisationId: string
  status: string
}

enum InviteStatus {
  Pending = 'Pending',
  Revoked = 'Revoked',
  Accepted = 'Accepted',
  Redeemed = 'Redeemed'
}

(async () => {
  try {
    Invite.init({
      id: {
        ...requiredString,
        primaryKey: true
      },
      email: {
        ...requiredString
      },
      organisationId: {
        ...requiredString
      },
      status: {
         ...requiredString
      }
    }, {
      sequelize: await db(),
      modelName: 'Invite'
    })
    
    await Invite.sync(syncOptions)
    console.log('[DEV] Successful table sync for "Invite"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Invite"');
    console.error(err);
    process.exit(1);
  }
})()

export const createInvite = async (email: string, organisationId: string) => {
  if (!email) throw new MissingParameterError('email');
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const existing = await getInvitesByEmailAndOrganisation(email, organisationId);
    if (existing.length > 0) throw new BadRequestError('This user has already been invited.');
    const inviteId = v4();
    const response = await Invite.create({ id: inviteId, email, organisationId, status: InviteStatus.Pending });
    const organisation = await getOrganisation(organisationId) as any;
    sendEmail(email, EmailType.Invite, { organisationName: organisation.name, inviteId })
    return response.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    if (e instanceof CustomError) throw e;
    throw new DatabaseError('Could not save this invite.');
  }
}

export const getInvite = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Invite.findByPk(id);
    return response.toJSON();  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this invite.');
  }
}

export const redeemInvites = async (ids: string[], personId: string) => {
  if (!ids && ids.length) throw new MissingParameterError('ids');

  try {
    return Promise.all(ids.map(id => redeemInvite(id, personId)));  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not redeem these invites.');
  }
}

export const redeemInvite = async (id: string, personId: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const invite = await Invite.findOne({ where: { id, status: 'Pending' }});
    const organisationId = invite.get('organisationId') as string;
    await addPersonToOrganisation(organisationId, personId);
    await addOrganisationToPerson(personId, organisationId);
    invite.set('status', InviteStatus.Redeemed);
    await invite.save();
    return invite.toJSON();  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not redeem this invite.');
  }
}

export const addOrganisationToUser = async (organisationId: string, personId: string) => {
  const url = await getSetting('microservices:auth:add_to_organisation_url');
  const response = await fetch(url, { 
    method: 'POST',
    body: JSON.stringify({ organisationId, personId })
  });

  if (!response.status.toString().startsWith('2')) {
    throw new BadRequestError(`Communication with Azure B2C failed: ${await response.text()}`);
  }
}

export const acceptInvite = async (id: string, personId: string, email: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!personId) throw new MissingParameterError('personId');
  if (!email) throw new MissingParameterError('email');

  try {
    const invite = await Invite.findByPk(id);
    if (!invite) throw new NotFoundError('This invite cannot be found.');
    if (invite.get('email') !== email) throw new NotFoundError('You can only redeem your own invite.')
    const organisationId = invite.get('organisationId') as string;
    await addOrganisationToUser(organisationId, personId)
    await addPersonToOrganisation(organisationId, personId);
    await addOrganisationToPerson(personId, organisationId);
    invite.set('status', InviteStatus.Redeemed);
    await invite.save();
    return invite.toJSON();  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not redeem this invite.');
  }
}

export const revokeInvite = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const invite = await Invite.findByPk(id);
    invite.set('status', InviteStatus.Revoked);
    await invite.save();
    return invite.toJSON();  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not revoke this invite.');
  }
}

export const getInvitesByEmail = async (email: string) => {
  if (!email) throw new MissingParameterError('email');

  try {
    const responses = await Invite.findAll({ where: { email, status: 'Pending' }});
    return responses.map((res: any) => res.toJSON());  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these invites.');
  }
}

export const getInvitesByOrganisation = async (organisationId: string) => {
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const responses = await Invite.findAll({ where: { organisationId, status: 'Pending' }});
    return responses.map((res: any) => res.toJSON());  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these invites.');
  }
}

export const getInvitesByEmailAndOrganisation = async (email: string, organisationId: string) => {
  if (!organisationId) throw new MissingParameterError('organisationId');
  if (!email) throw new MissingParameterError('email');

  try {
    const responses = await Invite.findAll({ where: { email, organisationId, status: 'Pending' }});
    return responses.map((res: any) => res.toJSON());  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these invites.');
  }
}