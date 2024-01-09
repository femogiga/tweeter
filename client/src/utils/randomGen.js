import uniqueRandom from 'unique-random';

export const randomGenerator = (length) => {
  const random = uniqueRandom(0, length);
  let firstNum = random();
  let secondNum = random();
return [firstNum, secondNum];

};



console.log('rand===>',randomGenerator([1,2,3,4,5]))
