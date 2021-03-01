import db from  './database-client';
import { Model } from 'sequelize';

import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError, NotFoundError, CustomError } from '../common/errors';
import { syncOptions, requiredString, optionalString } from '../helpers/db';

class Person extends Model {}

(async () => {
  try {
    Person.init({
      id: {
        ...requiredString,
        primaryKey: true
      },
      oId: {
        ...requiredString,
        unique: true
      },
      firstName: {
        ...requiredString
      },
      lastName: {
        ...requiredString
      },
      email: {
        ...optionalString
      },
      phoneNumber: {
        ...optionalString
      }
    }, {
      sequelize: await db(),
      modelName: 'Person'
    })
    
    await Person.sync(syncOptions)
    console.log('[DEV] Successful table sync for "Person"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Person"');
    console.error(err);
    process.exit(1);
  }
})()

export const createPerson = async (oId: string, firstName: string, lastName: string, email?: string, phoneNumber?: string) => {
  if (!oId) throw new MissingParameterError('oId');

  try {
    const response = await Person.create({ id: v4(), oId, firstName, lastName, email, phoneNumber });
    return response.toJSON();
  } catch (e) {
    throw new DatabaseError('Could not save this person.');
  }
}

export const getPerson = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Person.findOne({ where: { id }});
    return response.toJSON();  
  } catch (e) {
    throw new DatabaseError('Could not get this person.');
  }
}

export const getPersonByOId = async (oId: string) => {
  if (!oId) throw new MissingParameterError('oId');

  try {
    const response = await Person.findOne({ where: { oId }});

    if (!response) throw new NotFoundError('That person does not exist.')

    return response.toJSON();  
  } catch (e) {
    if (e instanceof CustomError) throw e;
    throw new DatabaseError('Could not get this person.');
  }
}

export const getOrganisations = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const responses = await Person.findAll({ where: { text }});
    return responses.map((res: any) => res.toJSON());  
  } catch (e) {
    throw new DatabaseError('Could not get these people.');
  }
}