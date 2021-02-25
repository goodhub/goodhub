import { DataTypes } from 'sequelize';

export const syncOptions = { alter: (process.env['NODE_ENV'] !== 'production')};

export const requiredString = {
  type: DataTypes.STRING,
  allowNull: false
}

export const optionalString = {
  type: DataTypes.STRING,
  allowNull: true
}