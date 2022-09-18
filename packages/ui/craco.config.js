 /* craco.config.js */
const path = require(`path`);

const sharedTypes = path.resolve(__dirname, '../api/src/types');

module.exports = {
  webpack: {
    alias: {
      '@Types': sharedTypes,
    }
  },
};