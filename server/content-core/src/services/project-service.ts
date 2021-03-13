import db from  './database-client';
import { Model } from 'sequelize';

import * as Sentry from '@sentry/node';
import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString } from '../helpers/db';

class Project extends Model {}

(async () => {
  try {
    Project.init({
      id: {
        ...requiredString,
        primaryKey: true
      },
      name: {
        ...requiredString
      },
      organisationId: {
        ...requiredString
      }
    }, {
      sequelize: await db(),
      modelName: 'Project'
    })
    
    await Project.sync(syncOptions)
    console.log('[DEV] Successful table sync for "Project"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Project"');
    console.error(err);
    process.exit(1);
  }
})()

export const createProject = async (organisationId: string, name: string) => {
  if (!organisationId) throw new MissingParameterError('organisationId');
  if (!name) throw new MissingParameterError('name');

  try {
    const project = await Project.create({ id: v4(), organisationId, name });
    return project.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this project.');
  }
}

export const getProject = async (organisationId: string, id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const project = await Project.findOne({ where: { id, organisationId }});
    return project.toJSON();  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this project.');
  }
}

export const getProjectsByOrganisation = async (organisationId: string) => {
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const projects = await Project.findAll({ where: { organisationId }});
    return projects.map((res: any) => res.toJSON());  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these projects.');
  }
}