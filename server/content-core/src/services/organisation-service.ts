import db from  './database-client';
import { Model } from 'sequelize';

import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString } from '../helpers/db';

class Organisation extends Model {}

(async () => {
  try {
    Organisation.init({
      id: {
        ...requiredString,
        primaryKey: true
      },
      name: {
        ...requiredString
      }
    }, {
      sequelize: await db(),
      modelName: 'Organisation'
    })
    
    await Organisation.sync(syncOptions)
    console.log('[DEV] Successful table sync for "Organisation"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Organisation"');
    console.error(err);
    process.exit(1);
  }
})()

export const createOrganisation = async (name: string) => {
  if (!name) throw new MissingParameterError('name');

  try {
    const response = await Organisation.create({ id: v4(), name });
    return response.toJSON();
  } catch (e) {
    throw new DatabaseError('Could not save this Organisation.');
  }
}

export const getOrganisation = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Organisation.findOne({ where: { id }});
    return response.toJSON();  
  } catch (e) {
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const getOrganisations = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const responses = await Organisation.findAll({ where: { text }});
    return responses.map((res: any) => res.toJSON());  
  } catch (e) {
    throw new DatabaseError('Could not get these Organisations.');
  }
}