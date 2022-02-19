import { Sequelize } from 'sequelize';
import { DatabaseError } from '../common/errors';

let pending: Promise<Sequelize>

const getDB = async () => {
  console.log('[DEV] Attempting to connect to database');

  try {
    console.log('[DEV] Attempting to connect to database');

    const pgDatabase = process.env.DB_DATABASE
    const pgUser = process.env.DB_USER
    const pgPassword = process.env.DB_PASSWORD
    const pgHost = process.env.DB_HOST

    const sequelize = new Sequelize(pgDatabase, pgUser, pgPassword, {
      host: pgHost,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: true
      },
      pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 1000 * 60 * 60 * 4 // 4 hour connection lifetime
      }
    });
    await sequelize.authenticate();
    return sequelize;
  } catch (e) {
    console.log(e);
    throw new DatabaseError('[DEV] Failed connection to database');
  }
}

const db = async (): Promise<Sequelize> => {
  if (!pending) pending = getDB();
  return await pending;
}

export default db;