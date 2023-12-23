 const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'lara',
    database: 'tweeter',
  },
});


module.exports = {knex}
