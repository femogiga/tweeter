export const userFinder = async (array, id) => {
    const result = await array.find((item) => item?.id === id);
    return result
};

const data = [
  {
    id: 1,
    firstName: 'Ronke',
    lastName: 'Oshodi',
    email: 'ronke@mail.com',
    photo:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    profile: 'I love designs and everything which has to do with designs',
    profileImageBackground:
      'https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    firstName: 'Bola',
    lastName: 'Tinubu',
    email: 'tinubu@mail.com',
    photo:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    profile: 'I am learning programming in my spare time',
    profileImageBackground:
      'https://images.pexels.com/photos/707915/pexels-photo-707915.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    firstName: 'Tony',
    lastName: 'Mark',
    email: 'tony@mail.com',
    photo:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    profile: 'I love biking down the beaten path',
    profileImageBackground:
      'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    firstName: 'Christiano',
    lastName: 'Ronaldo',
    email: 'ronaldo@mail.com',
    photo:
      'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600',
    profile: 'I am a football fanatic who supports arsenal FC',
    profileImageBackground:
      'https://images.pexels.com/photos/1089194/pexels-photo-1089194.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];
const result  = userFinder(data, 4);
console.log('user', result);
