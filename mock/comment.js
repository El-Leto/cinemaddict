import dayjs from 'dayjs';
import { generateText } from './film.js';
import { getRandomArrayElement, getRandomInteger }  from './random.js';
import { EMOJIS }  from '../const.js';

const AUTHORS = [
  'Ivan',
  'Maria',
  'Nick',
  'Pit',
  'Jim',
];

let commentId = 0;

const generateComment = () => {
  const dataComment = dayjs().subtract(getRandomInteger(0, 10), 'day');

  return {
    id: commentId++,
    author: getRandomArrayElement(AUTHORS),
    text: generateText(),
    date: dataComment,
    emoji: getRandomArrayElement(EMOJIS),
  };
};

export { generateComment };
