import fetch from 'node-fetch';
import { MissingParameterError } from '../common/errors';
import { getSetting } from 'goodhub-lib';

export enum EmailType {
  Invite = 'Invite'
}

const getBodyForEmailType = async (type: EmailType, metadata?: { [key: string]: string }) => {
  switch (type) {
    case EmailType.Invite:
      const url = await getSetting('auth:ui:base_url');
      return `You've been invited to ${metadata?.organisationName}!
      Please go to <a href="${url}">${url}</a> to sign up or sign in.`  
    default:
      return '';
  }
}

export const sendEmail = async (to: string, email: EmailType, metadata?: { [key: string]: string }) => {

  if (!to) throw new MissingParameterError('to');
  if (!email) throw new MissingParameterError('email');
  
  const body = await getBodyForEmailType(email, metadata);

  const from = await getSetting('microservices:send_email:default_from_subject');
  const sendEmailMicroserviceUrl = await getSetting('microservices:send_email:url')
  try {
    await fetch(sendEmailMicroserviceUrl, { method: 'POST', body: JSON.stringify({ to, from, body }), headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    console.log(e);
  }
}