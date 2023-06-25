import { DataTypes } from 'sequelize';

export const syncOptions = { alter: process.env['NODE_ENV'] !== 'production' };

export const requiredString = {
  type: DataTypes.STRING,
  allowNull: false
};

export const requiredNumber = {
  type: DataTypes.DOUBLE,
  allowNull: true
};

export const optionalString = {
  type: DataTypes.STRING,
  allowNull: true
};

export const requiredDate = {
  type: DataTypes.DATE,
  allowNull: false
};

export const requiredJSON = {
  type: DataTypes.JSON,
  allowNull: false
};

export const optionalJSON = {
  type: DataTypes.JSON,
  allowNull: true
};
