import uniqueRandom from 'unique-random';

const randomGenerator = (length) => {
  // if (length <= 0) {
  //   return
  // }
  const random = uniqueRandom(0, length);
  let firstNum = random();
  let secondNum = random();
  return [firstNum, secondNum];
};

console.log('rand===>', randomGenerator([1, 2, 3, 4, 5]));

export default randomGenerator;
