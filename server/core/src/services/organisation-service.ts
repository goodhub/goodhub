import db from  './database-client';
import NodeCache from 'node-cache';
import { DataTypes, Model, fn, col, ModelAttributes } from 'sequelize';

import * as Sentry from '@sentry/node';

import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString, optionalJSON, optionalString } from '../helpers/db';
import { addOrganisationToUser } from './person-service';
import { CustomError, IOrganisation, IWebsiteConfiguration, NotFoundError } from '@strawberrylemonade/goodhub-lib';

class Organisation extends Model {}

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
  primaryColor: {
    ...optionalJSON
  },
  secondaryColor: {
    ...optionalJSON
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
  }
};

const Website = {
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

const Team = {
  people: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
};

(async () => {
  try {
    Organisation.init({
      ...Identifiers,
      ...Profile,
      ...Website,
      ...Team
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
    const id = v4();

    const organisation = await Organisation.create({ id, name, people: [creatorPersonId] });
    await addOrganisationToUser(creatorPersonId, id);
    return organisation.toJSON();
  } catch (e) {
    Sentry.captureException(e);
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
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this Organisation.');
  }
}

export const getOrganisation = async (id: string) => {
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
        const organisation = await Organisation.findOne({ where: { domainName: idOrDomainOrSlug }, attributes: WebsiteConfigFields});
        
        if (!organisation) return;
        const object = organisation.toJSON();
        WebsiteCache.set(idOrDomainOrSlug, object)
        return object;
      }

      const organisation = await Organisation.findOne({ where: { slug: idOrDomainOrSlug }, attributes: WebsiteConfigFields});

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
    WebsiteCache.del([response.id, response.domainName, response.slug]);
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these Organisations.');
  }
}

export const getOrganisations = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const organisations = await Organisation.findAll({ where: { text }});
    return organisations.map((res: any) => res.toJSON());  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these Organisations.');
  }
}