import { FC } from 'react';
import Invite from './templates/Invite';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      center: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export type Configuration = { [key: string]: string };
export interface DefaultConfiguration extends Configuration {
  languageCode: string;
}

export type ConfigurationDescription = {
  [key in keyof Configuration]: {
    description: string;
    required: boolean;
  };
};

export interface Persona {
  name: string;
  email: string;
}

export type PersonaKey = string;

export type TextContent = (configuration: Configuration) => string[];
export type SubjectContent = (configuration: Configuration) => string;

export interface Template {
  config: ConfigurationDescription;
  persona: PersonaKey;
  HTML: FC<any>;
  subject: SubjectContent;
  text: TextContent;
  validate: (configuration: Configuration) => void;
}

export type Templates = { [key: string]: Template };
export const templates: { [key: string]: Template } = {
  Invite: Invite
};

export type Personas = { [key: string]: Persona };
export const personas: { [key: string]: Persona } = {
  Account: {
    name: 'GoodHub',
    email: 'accounts@goodhub.org.uk'
  }
};
