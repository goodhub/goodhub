import db from './database-client';
import NodeCache from 'node-cache';
import { DataTypes, Model, fn, col, ModelAttributes } from 'sequelize';
import fetch from 'node-fetch';

import * as Sentry from '@sentry/node';

import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError, BadRequestError } from '../common/errors';
import { syncOptions, requiredString, optionalJSON, optionalString } from '../helpers/db';
import { addOrganisationToPerson } from './person-service';
import { removeOrganisationFromPerson } from './person-service';
import { CustomError, IOrganisation, IWebsiteConfiguration, NotFoundError, ISocialConfig } from '@strawberrylemonade/goodhub-lib';
import { getSetting } from '../helpers/backstage';
import { addOrganisationToUser, createInvite } from './invite-service';

class Organisation extends Model { }

const Identifiers: ModelAttributes = {
  id: {
    ...requiredString,
    primaryKey: true
  },
  name: {
    ...requiredString,
    unique: true
  },
  slug: {
    ...optionalString,
    unique: true
  },
  domainName: {
    ...optionalString,
    unique: true
  }
};

const Profile: ModelAttributes = {
  brandColors: {
    ...optionalJSON
  },
  description: {
    ...optionalString
  },
  contactPhoneNumber: {
    ...optionalString
  },
  contactAddress: {
    ...optionalString
  },
  UKCharityNumber: {
    ...optionalString
  },
  logos: {
    ...optionalJSON
  },
  hero: {
    ...optionalJSON
  },
  profilePicture: {
    ...optionalJSON
  },
  about: {
    ...optionalJSON
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true
  }
};

const Website: ModelAttributes = {
  alert: {
    ...optionalString
  },
  featuredProjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  externalLinks: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true
  }
};

const Team: ModelAttributes = {
  people: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
};

const Sensitive: ModelAttributes = {};

const Social: ModelAttributes = {
  social: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

(async () => {
  try {
    Organisation.init({
      ...Identifiers,
      ...Profile,
      ...Website,
      ...Team,
      ...Sensitive,
      ...Social
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

export const createOrganisation = async (creatorPersonId: string, candidate: (Partial<IOrganisation> & { teamMembers: string []})) => {
  if (!creatorPersonId) throw new MissingParameterError('creatorPersonId');
  if (!candidate) throw new MissingParameterError('organisation');

  try {
    const id = v4();

    const organisation = await Organisation.create({ id, people: [creatorPersonId], ...candidate });
    await addOrganisationToPerson(creatorPersonId, id);
    await addOrganisationToUser(id, creatorPersonId);
    await Promise.all(candidate.teamMembers.map((t) => createInvite(t, id)));
    return organisation.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this Organisation.');
  }
}

export const addPersonToOrganisation = async (id: string, personId: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!personId) throw new MissingParameterError('personId');

  try {
    const organisation = await Organisation.findOne({ where: { id } });
    await organisation.update({ people: fn('array_append', col('people'), personId) })
    return organisation.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const removePersonFromOrganisation = async (id: string, personId: string) => {
  if (!id) throw new MissingParameterError('id');
  if (!personId) throw new MissingParameterError('personId');

  try {
    const organisation = await Organisation.findOne({ where: { id } });
    await organisation.update({ people: fn('array_remove', col('people'), personId) })
    return organisation.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const removeOrganisationFromUser = async (organisationId: string, personId: string) => {
  const url = await getSetting('microservices:auth:remove_from_organisation_url');
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ organisationId, personId })
  });

  if (!response.status.toString().startsWith('2')) {
    throw new BadRequestError(`Communication with Azure B2C failed: ${await response.text()}`);
  }
}

export const removePerson = async (organisationId: string, personId: string) => {
  if (!organisationId) throw new MissingParameterError('organisationId');
  if (!personId) throw new MissingParameterError('personId');

  try {
    await removeOrganisationFromUser(organisationId, personId)
    await removeOrganisationFromPerson(personId, organisationId);
    await removePersonFromOrganisation(organisationId, personId);
    return await getOrganisation(organisationId);
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not remove this person.');
  }
}

export const getOrganisation = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const organisation = await Organisation.findByPk(id, { attributes: [...Object.keys(Identifiers), ...Object.keys(Team), 'profilePicture'] });
    return organisation.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const updateOrganisation = async (id: string, candidate: Partial<IOrganisation>) => {
  if (!id) throw new MissingParameterError('id');
  if (!candidate) throw new MissingParameterError('candidate');

  try {
    const organisation = await Organisation.findByPk(id);
    await organisation.update(candidate, {
      fields: [
        ...Object.keys(Identifiers),
        ...Object.keys(Profile),
        ...Object.keys(Website),
        ...Object.keys(Team)
      ]
    });
    return organisation.toJSON() as IWebsiteConfiguration;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these Organisations.');
  }
}

export const getExtendedOrganisation = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const organisation = await Organisation.findByPk(id, {
      attributes:
        [
          ...Object.keys(Identifiers),
          ...Object.keys(Profile),
          ...Object.keys(Website),
          ...Object.keys(Team),
          ...Object.keys(Social)
        ]
    });
    return organisation.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const getOrganisationSocialConfiguration = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const organisation = await Organisation.findByPk(id, {
      attributes:
        [
          ...Object.keys(Social),
        ]
    });
    return organisation.toJSON() as { social: ISocialConfig };
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const getOrganisationSensitiveInfo = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const organisation = await Organisation.findByPk(id, { attributes: [...Object.keys(Sensitive)] });
    return organisation.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const getOrganisationProfile = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const organisation = await Organisation.findByPk(id);
    return organisation.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this Organisation.');
  }
}

const WebsiteCache = new NodeCache({ checkperiod: 60 * 15, stdTTL: 60 * 60 * 2 });
const looksLikeUUIDV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
const looksLikeDomain = new RegExp(/^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/i);

const WebsiteConfigFields = [
  ...Object.keys(Identifiers),
  ...Object.keys(Profile),
  ...Object.keys(Website),
];

export const getWebsiteConfiguration = async (idOrDomainOrSlug: string) => {
  if (!idOrDomainOrSlug) throw new MissingParameterError('ID or domain or slug');

  try {
    const organisation = await (async () => {
      const cachedOrganisation = WebsiteCache.get(idOrDomainOrSlug);
      if (cachedOrganisation) return cachedOrganisation;

      // If the incoming id or domain or slug looks like an ID (high degree of confidence in the regex) treat it as the regex.
      if (looksLikeUUIDV4.test(idOrDomainOrSlug)) {
        const organisation = await Organisation.findByPk(idOrDomainOrSlug, { attributes: WebsiteConfigFields });

        if (!organisation) return;
        const object = organisation.toJSON();
        WebsiteCache.set(idOrDomainOrSlug, object)
        return object;
      }

      // If the incoming looks like a domain
      if (looksLikeDomain.test(idOrDomainOrSlug)) {
        const organisation = await Organisation.findOne({ where: { domainName: idOrDomainOrSlug }, attributes: WebsiteConfigFields });

        if (!organisation) return;
        const object = organisation.toJSON();
        WebsiteCache.set(idOrDomainOrSlug, object)
        return object;
      }

      const organisation = await Organisation.findOne({ where: { slug: idOrDomainOrSlug }, attributes: WebsiteConfigFields });

      if (!organisation) return;
      const object = organisation.toJSON();
      WebsiteCache.set(idOrDomainOrSlug, object)
      return object;
    })()

    if (!organisation) throw new NotFoundError('No organisation is found using this lookup.');
    return organisation as IWebsiteConfiguration;
  } catch (e) {
    Sentry.captureException(e);
    if (e instanceof CustomError) throw e;
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const updateWebsiteConfiguration = async (id: string, candidate: Partial<IOrganisation>) => {
  if (!id) throw new MissingParameterError('id');
  if (!candidate) throw new MissingParameterError('organisation');

  try {
    const organisation = await Organisation.findByPk(id);
    await organisation.update(candidate, { fields: [...Object.keys(Profile), ...Object.keys(Website)] });
    const response = organisation.toJSON() as IWebsiteConfiguration;
    WebsiteCache.del([response.id, response.domainName, response.slug].filter(Boolean));
    return response;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these Organisations.');
  }
}

export const getOrganisations = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const organisations = await Organisation.findAll({ where: { text } });
    return organisations.map((res: any) => res.toJSON());
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these Organisations.');
  }
}