//  const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'lara',
//     database: 'tweeter',
//   },
//  });


 const knex = require('knex')({
   client: 'pg',
   connection: {
     host: 'monorail.proxy.rlwy.net',
     user: 'postgres',
     password: 'Fbgea44efcbd6*aa*ed*G-*bG5c2A5fe',
     database: 'railway',
   },
 });


module.exports = {knex}
