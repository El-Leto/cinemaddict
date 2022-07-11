const getRandomNumber = function(min, max) {
  if (min < 0 || max <= min) {
    throw new Error('Неверные данные');
  }

  return Math.random() * (max - min + 1) + min;
};

const getRandomInteger = function(min, max) {
  return Math.floor(getRandomNumber(min, max));
};

const getRandomFixed = function (min, max, fixedNumber) {
  const rand = +(getRandomNumber(min, max));

  return rand.toFixed(fixedNumber);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getNewArray = (array, randomNumber) => {
  const someArray = [];
  for (let i = 0; i <= randomNumber; i++) {
    someArray.push(array[i]);
  }
  const newArray = new Set(someArray);
  return Array.from(newArray);
};

const getShuffledArray = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

export { getRandomInteger, getRandomFixed, getRandomArrayElement, getNewArray, getShuffledArray };
