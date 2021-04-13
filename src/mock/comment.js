import dayjs from 'dayjs';
import { generateText } from './film.js';
import { getRandomArrayElement, getRandomInteger }  from '../utils.js';

const EMOJI = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

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
    comment: generateText(),
    date: dataComment,
    emotion: getRandomArrayElement(EMOJI),
  };
};

export { generateComment };
