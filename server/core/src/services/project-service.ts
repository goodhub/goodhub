import db from  './database-client';
import { DataTypes, Model } from 'sequelize';

import * as Sentry from '@sentry/node';
import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString, optionalJSON } from '../helpers/db';
import { IProject } from '@strawberrylemonade/goodhub-lib';

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
      },
      description: {
        ...requiredString
      },
      hero: {
        ...optionalJSON
      },
      about: {
        ...optionalJSON
      },
      externalLinks: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      people: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      primaryContact: {
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

export const createProject = async (organisationId: string, candidate: Partial<IProject>) => {
  if (!organisationId) throw new MissingParameterError('organisationId');
  if (!candidate) throw new MissingParameterError('candidate');

  try {
    const project = await Project.create({ id: v4(), organisationId, ...candidate });
    return project.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this project.');
  }
}

export const getProject = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const project = await Project.findByPk(id);
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