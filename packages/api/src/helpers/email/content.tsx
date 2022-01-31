import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Configuration, personas, templates } from './template';

export const getConfiguration = (templateId: string) => {
  const template = templates[templateId];
  if (!template) throw new Error('No template found');
  return template.config;
}

export const getPersona = (templateId: string) => {
  const template = templates[templateId];
  if (!template) throw new Error('No template found');
  return personas[template.persona];
}

export const getTemplateIds = () => {
  return Object.keys(templates).map((id: string) => ({ id }));
}

export const generateHTML = (templateId: string, config: Configuration) => {
  const template = templates[templateId];
  if (!template) throw new Error('No template found');

  const { HTML, validate }  = template;
  validate(config) // Throws if an issue occurs

  return `<!DOCTYPE html>${renderToStaticMarkup(<HTML {...config } />)}`;
}

export const generateText = (templateId: string, config: Configuration) => {
  const template = templates[templateId];
  if (!template) throw new Error('No template found');

  const { text, validate } = template;
  validate(config)// Throws if an issue occurs

  return text(config);
}

export const generateSubject = (templateId: string, config: Configuration) => {
  const template = templates[templateId];
  if (!template) throw new Error('No template found');

  const { subject, validate } = template;
  validate(config)// Throws if an issue occurs

  return subject(config);
}