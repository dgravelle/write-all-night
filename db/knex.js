const environment = process.env.NODE_DEV || 'development';
const config = require('../knexfile')[environment]
module.exports = require('knex')(config);
