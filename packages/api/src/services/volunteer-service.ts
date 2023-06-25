import moment from 'moment';

import db from './database-client';
import { DataTypes, Model } from 'sequelize';

import { v4 } from 'uuid';
import { MissingParameterError, DatabaseError } from '../common/errors';
import { optionalString, requiredString, syncOptions } from '../helpers/db';

enum IVolunteerStatus {
  Open = 'Open',
  Notified = 'Notified',
  Revoked = 'Revoked',
  Rejected = 'Rejected'
}

interface IVolunteer {
  id: string;
  volunteerId: string;
  activityId: string;
  activityType: string;
  expiry: Date;
  status: IVolunteerStatus;
}

class Volunteer extends Model {}

(async () => {
  try {
    Volunteer.init(
      {
        id: {
          ...requiredString,
          primaryKey: true
        },
        volunteerId: {
          ...requiredString
        },
        activityId: {
          ...requiredString
        },
        activityType: {
          ...optionalString
        },
        expiryDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        status: {
          ...requiredString
        }
      },
      {
        sequelize: await db(),
        modelName: 'Volunteer'
      }
    );

    await Volunteer.sync(syncOptions);
    console.log('[DEV] Successful table sync for "Volunteer"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Volunteer"');
    console.error(err);
    process.exit(1);
  }
})();

export const createVolunteerContract = async (personId: string, candidate: Partial<IVolunteer>) => {
  if (!personId) throw new MissingParameterError('personId');
  if (!candidate) throw new MissingParameterError('candidate');

  try {
    const contract = await Volunteer.create({
      ...candidate,
      id: v4(),
      volunteerId: personId,
      status: IVolunteerStatus.Open,
      expiry: moment().add(90, 'days').toDate()
    });
    return contract.toJSON();
  } catch (e) {
    throw new DatabaseError('Could not create this volunteer contract.');
  }
};

export const getVolunteersForOrganisation = async (orgId: string) => {
  if (!orgId) throw new MissingParameterError('orgId');

  try {
    const contracts = await Volunteer.findAll({ where: { activityId: orgId } });
    return contracts.map(c => c.toJSON());
  } catch (e) {
    throw new DatabaseError('Could not get these volunteers.');
  }
};

export const getVolunteersForProject = async (projectId: string) => {
  if (!projectId) throw new MissingParameterError('personId');

  try {
    const contracts = await Volunteer.findAll({
      where: { activityId: projectId }
    });
    return contracts.map(c => c.toJSON());
  } catch (e) {
    throw new DatabaseError('Could not get these volunteers.');
  }
};

export const getContractsForPerson = async (personId: string) => {
  if (!personId) throw new MissingParameterError('personId');

  try {
    const contracts = await Volunteer.findAll({
      where: { volunteerId: personId }
    });
    return contracts.map(c => c.toJSON());
  } catch (e) {
    throw new DatabaseError('Could not get these contracts.');
  }
};
