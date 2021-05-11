const truncateText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}…`
    : text;

const getСapitalLetter = (word) => (
  `${word[0].toUpperCase()}${word.slice(1)}`
);

const isObject = (obj) =>{
  return obj != null && obj.constructor.name === 'Object';
};

const deepClone = (obj) => {
  const cloneObject = {};
  for (const i in obj) {
    if (isObject(obj[i])) {
      cloneObject[i] = deepClone(obj[i]);
      continue;
    }
    cloneObject[i] = obj[i];
  }

  return cloneObject;
};

export { truncateText, getСapitalLetter, deepClone };
