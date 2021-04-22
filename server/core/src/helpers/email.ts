import fetch from 'node-fetch';
import { withTransaction } from '@strawberrylemonade/goodhub-lib';

import { MissingParameterError } from '../common/errors';
import { getSetting } from './backstage';

export enum EmailType {
  Invite = 'Invite'
}

const getBodyForEmailType = async (type: EmailType, metadata?: { [key: string]: string }) => {
  switch (type) {
    case EmailType.Invite:
      const url = await getSetting('connections:ui:base_url');
      return `You've been invited to ${metadata?.organisationName}!
      Please go to <a href="${url}/me/login">${url}/me/login</a> to sign up or sign in.`  
    default:
      return '';
  }
}

export const sendEmail = withTransaction(async (to: string, email: EmailType, metadata?: { [key: string]: string }) => {

  if (!to) throw new MissingParameterError('to');
  if (!email) throw new MissingParameterError('email');
  
  const body = await getBodyForEmailType(email, metadata);

  const from = await getSetting('email:content:default_from_subject');
  const sendEmailMicroserviceUrl = await getSetting('microservices:send_email:url')
  try {
    await fetch(sendEmailMicroserviceUrl, { method: 'POST', body: JSON.stringify({ to, from, body }), headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    console.log(e);
  }
}, 'Send email')