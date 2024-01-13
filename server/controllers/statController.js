const { knex } = require('../knex');

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
          .whereRaw('??=??', ['Follower.personId', id])
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
