import db from  './database-client';
import { Model } from 'sequelize';

import * as Sentry from '@sentry/node';
import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString } from '../helpers/db';
import { sendEmail, EmailType } from '../helpers/email';
import { addUserToOrganisation, getOrganisation } from './organisation-service';
import { addOrganisationToUser } from './person-service';

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
    const response = await Invite.create({ id: v4(), email, organisationId, status: InviteStatus.Pending });

    const organisation = await getOrganisation(organisationId) as any;
    await sendEmail(email, EmailType.Invite, { organisationName: organisation.name })
    return response.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this invite.');
  }
}

export const getInvite = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Invite.findOne({ where: { id }});
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
    const invite = await Invite.findOne({ where: { id }});

    const organisationId = invite.get('organisationId') as string;
    await addUserToOrganisation(organisationId, personId);
    await addOrganisationToUser(personId, organisationId);
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
    const invite = await Invite.findOne({ where: { id }});
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
    const responses = await Invite.findAll({ where: { email }});
    return responses.map((res: any) => res.toJSON());  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these invites.');
  }
}

export const getInvitesByOrganisation = async (email: string) => {
  if (!email) throw new MissingParameterError('email');

  try {
    const responses = await Invite.findAll({ where: { email }});
    return responses.map((res: any) => res.toJSON());  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these invites.');
  }
}