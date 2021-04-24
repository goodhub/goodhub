import db from  './database-client';
import { col, DataTypes, fn, Model } from 'sequelize';

import * as Sentry from '@sentry/node';
import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString, optionalString, optionalJSON } from '../helpers/db';
import { IPerson, IPersonState } from '@strawberrylemonade/goodhub-lib';

class Person extends Model {}

(async () => {
  try {
    Person.init({
      id: {
        ...requiredString,
        primaryKey: true
      },
      state: {
        ...requiredString,
      },
      organisations: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      firstName: {
        ...optionalString
      },
      lastName: {
        ...optionalString
      },
      email: {
        ...optionalString
      },
      phoneNumber: {
        ...optionalString
      },
      profilePicture: {
        ...optionalJSON
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

export const bootstrapPerson = async () => {

  try {
    const response = await Person.create({ id: v4(), state: IPersonState.RequiresOnboarding, organisations: [] });
    return response.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this person.');
  }
}

export const createPerson = async (id: string, firstName: string, lastName: string, email?: string, phoneNumber?: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!firstName) throw new MissingParameterError('firstName');
  if (!lastName) throw new MissingParameterError('lastName');

  try {
    const person = await Person.findOne({ where: { id }});
    await person.update({ state: IPersonState.Identified, firstName, lastName, email, phoneNumber }, { fields: ['state', 'firstName', 'lastName', 'email', 'phoneNumber'] })
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this person.');
  }
}

export const getPerson = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Person.findByPk(id);
    return response.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
}

export const updatePerson = async (id: string, partial: Partial<Person>) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const person = await Person.findOne({ where: { id }});
    await person.update(partial, { fields: ['state', 'firstName', 'lastName', 'email', 'phoneNumber', 'profilePicture'] })
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
}

export const addOrganisationToPerson = async (id: string, organisationId: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const person = await Person.findOne({ where: { id }});
    await person.update({ organisations: fn('array_append', col('organisations'), organisationId) })
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
}

export const removeOrganisationFromPerson = async (id: string, organisationId: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const person = await Person.findOne({ where: { id }});
    await person.update({ organisations: fn('array_remove', col('organisations'), organisationId) })
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
}

export const getOrganisations = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const responses = await Person.findAll({ where: { text }});
    return responses.map((res: any) => res.toJSON() as IPerson);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these people.');
  }
}