import { Sequelize } from 'sequelize';
import { getSetting } from '../helpers/backstage';
import { DatabaseError } from '../common/errors';

let sequelize: Sequelize;

const getDB = async () => {
  console.log('[DEV] Attempting to connect to database');

  try {
    console.log('[DEV] Attempting to connect to database');

    const pgDatabase = await getSetting('infra:db:database');
    const pgUser = await getSetting('infra:db:user');
    const pgPassword = await getSetting('infra:db:password');
    const pgHost = await getSetting('infra:db:host');

    const sequelize = new Sequelize(pgDatabase, pgUser, pgPassword, {
      host: pgHost,
      dialect: 'postgres',
      dialectOptions: {
        ssl: true
      }
    });
    await sequelize.authenticate();
    return sequelize;
  } catch (e) {
    console.log(e);
    throw new DatabaseError('[DEV] Failed connection to database');
  }
}

const db = async () => {
  if (sequelize) return sequelize;
  return await getDB();
}

export default db;