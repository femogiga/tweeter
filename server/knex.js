 const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'lara',
    database: 'tweeter',
  },
 });

// const knex = require('knex')({
//   client: 'pg',
//   connection:
//     'postgresql://postgres:Fbgea44efcbd6*aa*ed*G-*bG5c2A5fe@postgres-e29z.railway.internal:5432/railway',
// });

module.exports = { knex };
