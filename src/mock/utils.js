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

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  if (mins > 60) {
    return hours + 'h ' + minutes + 'm';
  } else {
    return minutes + 'm';
  }
};

export { getRandomInteger, getRandomFixed, getRandomArrayElement, getNewArray, getTimeFromMins };
