import { SHAKE_TIMEOUT } from '../const.js';

const truncateText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}…`
    : text;

const getСapitalLetter = (word) => (
  `${word[0].toUpperCase()}${word.slice(1)}`
);

const shake = (element) => {
  element.classList.add('shake');
  setTimeout(() => element.classList.remove('shake'), SHAKE_TIMEOUT);
};

export { truncateText, getСapitalLetter, shake };
