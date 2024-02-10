//  const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'lara',
//     database: 'tweeter',
//   },
//  });
require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: process.env.CONNECTION_STRING,
});

module.exports = { knex };
