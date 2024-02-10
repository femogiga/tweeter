const { knex } = require('../knex');

// const getFollowingStat2 = async (req, res) => {
//   const id = parseInt(req.params.id);

//   try {
//     const result = knex('Follower')
//       .select(knex.raw('count(*) as followingCount'))
//       .countDistinct('personId')
//       .where('followerId', id)
//       .then((result) => {
//         const count = result[0]['count'];
//         console.log('Count of distinct personId is Following:===>', count);
//       })
//       .catch((err) => {
//         console.error('Error:', err);
//       });

//     const resulttwo = knex('Follower')
//       .select(knex.raw('count(*) as followerCount'))
//       .countDistinct('followerId')
//       .where('personId', id)
//       .then((result) => {
//         const count = result[0]['count'];
//         console.log('Count of distinct personId2:===>', count);
//       })
//       .catch((err) => {
//         console.error('Error:', err);
//       });

//     res.status(200).json(result);
//   } catch (error) {
//     //console.log(error);
//     res.status(500).json(error);
//   }
// };

const getFollowingStat = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await knex
      .from('User')
      .where('id', '=', id)
      .select(
        'User.id as id',
        knex('Follower')
          .count('*')
          .as('followingCount')
          .whereRaw('??=??', ['Follower.personId', id]),
        knex('Follower')
          .count('Follower.followerId')
          .as('followerCount')
          .whereRaw('??=??', ['Follower.followerId', id])
      )
      .groupBy('User.id');
    //console.log(result);
    res.status(200).json(result);
  } catch (error) {
    //console.log(error);
    res.status(500).json(error);
  }
};
module.exports = { getFollowingStat };
