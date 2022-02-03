import React, { FC } from 'react';
import dedent from 'dedent';
import Localization from 'react-localization';

import { Header, Container, Button, Footer, Section } from './components';
import { Template, DefaultConfiguration, TextContent, SubjectContent } from '../template';

/*  Configuration specific to this template,
    this could be the user's name to personlise, 
    information to construct a link or information about the notification.

    This will be combined with the default configuration.  */
const config = {
  organisationName: {
    required: true,
    description: "Name of the organisation",
  },
  inviteId: {
    required: true,
    description: "The ID of the invite",
  },
  url: {
    required: true,
    description: "The URL main application",
  }
}

type AccountNotificationConfig = { [key in keyof typeof config]: string } & DefaultConfiguration;

/* Before using the template, the system will use this function to
   validate the incoming configuration */
const validate = (configuration: Partial<AccountNotificationConfig>) => {
  if (!configuration.organisationName) throw new Error('Missing organisation');
  if (!configuration.inviteId) throw new Error('Missing inviteId');
  if (!configuration.url) throw new Error('Missing URL');
}

/* We want to ensure that our communications can be localized as easily as our UI is,
   so we will use the same localization library! */
const i18ns = new Localization({
  en: {
    title: 'Welcome to {organisationName}!',
    description: 'You have been invited to join {organisationName}! Login or sign up for a GoodHub account and redeem this invite using the button below.',
    button: 'Redeem your invite',
    text: dedent`
      Welcome to {organisationName}!
      Tap the link to redeem your invite: {url}/me/invite/{inviteId}
    `,
  }
})

/* This is the template that will be used to generate the HTML
   for the notification. */
const HTML: FC<AccountNotificationConfig> = ({ languageCode = 'en', url, inviteId, organisationName }) => {
  i18ns.setLanguage(languageCode);

  const title = i18ns.formatString(i18ns.title, { organisationName }) as string
  const description = i18ns.formatString(i18ns.description, { organisationName }) as string

  return <Container>
    <Header
      title={title}
      description={description}
    />
    <Section>
      <Button
        title={i18ns.button}
        link={`${url}/me/invite/${inviteId}`}
      />
    </Section>
    <Footer />
  </Container>
}

// Text limit is 160 characters including URLs, please split into multiple string if longer.
const text: TextContent = ({ organisationName, url, inviteId, languageCode = 'en' }) => {
  i18ns.setLanguage(languageCode);
  const text = i18ns.formatString(i18ns.text, { organisationName, url, inviteId }) as string;
  return [text];
}

const subject: SubjectContent = ({ languageCode = 'en', organisationName }) => {
  i18ns.setLanguage(languageCode);
  return i18ns.formatString(i18ns.title, { organisationName }) as string;
}

// What "person" should send the email or SMS.
const persona = 'Account';

const template: Template = {
  HTML, config, text, validate, subject, persona
}
export default template;