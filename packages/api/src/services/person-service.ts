import db from './database-client';
import { col, DataTypes, fn, Model } from 'sequelize';

import * as Sentry from '@sentry/node';
import { v4 } from 'uuid';
import intersection from 'lodash.intersection';

import { MissingParameterError, DatabaseError, NotFoundError } from '../common/errors';
import { syncOptions, requiredString, optionalString, optionalJSON } from '../helpers/db';
import { IPerson, IPersonState, ForbiddenError } from '../../../shared';

class Person extends Model {}

const Basics = {
  id: {
    ...requiredString,
    primaryKey: true
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
  profilePicture: {
    ...optionalJSON
  },
  following: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true
  }
};

const PersonStatus = {
  state: {
    ...requiredString
  }
};

const ContactDetails = {
  email: {
    ...optionalString
  },
  phoneNumber: {
    ...optionalString
  }
};

(async () => {
  try {
    Person.init(
      {
        ...Basics,
        ...PersonStatus,
        ...ContactDetails
      },
      {
        sequelize: await db(),
        modelName: 'Person'
      }
    );

    await Person.sync(syncOptions);
    console.log('[DEV] Successful table sync for "Person"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Person"');
    console.error(err);
    process.exit(1);
  }
})();

export const bootstrapPerson = async () => {
  try {
    const response = await Person.create({
      id: v4(),
      state: IPersonState.RequiresOnboarding,
      organisations: []
    });
    return response.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this person.');
  }
};

export const createPerson = async (
  id: string,
  firstName: string,
  lastName: string,
  email?: string,
  phoneNumber?: string
) => {
  if (!id) throw new MissingParameterError('id');
  if (!firstName) throw new MissingParameterError('firstName');
  if (!lastName) throw new MissingParameterError('lastName');

  try {
    const person = await Person.findOne({ where: { id } });
    if (!person) throw new NotFoundError('Could not find this person.');
    await person.update(
      {
        state: IPersonState.Identified,
        firstName,
        lastName,
        email,
        phoneNumber
      },
      { fields: ['state', 'firstName', 'lastName', 'email', 'phoneNumber'] }
    );
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this person.');
  }
};

export const getPerson = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Person.findByPk(id, {
      attributes: [...Object.keys(Basics)]
    });
    if (!response) throw new NotFoundError('Could not find this person.');
    return response.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
};

export const getColleague = async (id: string, requesterOrganisations: string[]) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Person.findByPk(id, {
      attributes: [...Object.keys(Basics), ...Object.keys(ContactDetails)]
    });
    if (!response) throw new NotFoundError('Could not find this person.');
    const requestedPersonOrganisations = response.get('organisations') as string[];
    if (intersection(requestedPersonOrganisations, requesterOrganisations).length === 0) {
      // The requester and the requestee have no organisation in common, as so they are not allowed access to the contact details.
      throw new ForbiddenError(`You are only able to access a colleague's contact information.`);
    }
    return response.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
};

export const getExtendedPerson = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Person.findByPk(id);
    if (!response) throw new NotFoundError('Could not find this person.');
    return response.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
};

export const updatePerson = async (id: string, partial: Partial<Person>) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const person = await Person.findOne({ where: { id } });
    if (!person) throw new NotFoundError('Could not find this person.');
    await person.update(partial, {
      fields: ['state', 'firstName', 'lastName', 'email', 'phoneNumber', 'profilePicture']
    });
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
};

export const updateFollow = async (personId: string, id: string, type: string) => {
  if (!personId) throw new MissingParameterError('personId');
  if (!id) throw new MissingParameterError('id');
  if (!type) throw new MissingParameterError('type');

  try {
    const person = await Person.findByPk(personId);
    if (!person) throw new NotFoundError('Could not find this person.');
    const following = (() => {
      const existingFollowing = (person.get('following') as { id: string }[]) ?? [];
      const isAlreadyFollowing = existingFollowing.reduce((isFollowing, entity) => {
        if (isFollowing) return isFollowing;
        return entity.id === id;
      }, false);

      if (isAlreadyFollowing) {
        return existingFollowing.filter(entity => entity.id !== id);
      }
      return [...existingFollowing, { id, type }];
    })();

    await person.update({ following: following });
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
};

export const addOrganisationToPerson = async (id: string, organisationId: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const person = await Person.findOne({ where: { id } });
    if (!person) throw new NotFoundError('Could not find this person.');
    await person.update({
      organisations: fn('array_append', col('organisations'), organisationId)
    });
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
};

export const removeOrganisationFromPerson = async (id: string, organisationId: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const person = await Person.findOne({ where: { id } });
    if (!person) throw new NotFoundError('Could not find this person.');
    await person.update({
      organisations: fn('array_remove', col('organisations'), organisationId)
    });
    return person.toJSON() as IPerson;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this person.');
  }
};

export const getOrganisations = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const responses = await Person.findAll({ where: { text } });
    return responses.map((res: any) => res.toJSON() as IPerson);
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these people.');
  }
};
