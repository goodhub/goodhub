import db from  './database-client';
import { DataTypes, Model, fn, col } from 'sequelize';

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
      },
      people: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
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

export const createOrganisation = async (name: string, creatorPersonId?: string) => {
  if (!name) throw new MissingParameterError('name');

  try {
    const organisation = await Organisation.create({ id: v4(), name, people: [] });
    return organisation.toJSON();
  } catch (e) {
    throw new DatabaseError('Could not save this Organisation.');
  }
}

export const addUserToOrganisation = async (id: string, personId: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!personId) throw new MissingParameterError('personId');

  try {
    const organisation = await Organisation.findOne({ where: { id }});
    await organisation.update({ people: fn('array_append', col('people'), personId) })
    return organisation.toJSON();  
  } catch (e) {
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const getOrganisation = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const organisation = await Organisation.findOne({ where: { id }});
    return organisation.toJSON();  
  } catch (e) {
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const getOrganisations = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const organisations = await Organisation.findAll({ where: { text }});
    return organisations.map((res: any) => res.toJSON());  
  } catch (e) {
    throw new DatabaseError('Could not get these Organisations.');
  }
}