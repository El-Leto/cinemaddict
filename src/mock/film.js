import { getRandomInteger, getRandomFixed, getRandomArrayElement, getNewArray, getShuffledArray }  from './utils.js';
import { generateComment } from './comment.js';

const TITLES = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
];

const POSTERS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const AGE_RATING = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];

const DIRECTORS = [
  'Martin Scorsese',
  'Peter Jackson',
  'Steven Spielberg',
  'Tim Burton',
  'David Fincher',
  'David Lynch',
  'Christopher Nolan',
  'Milos Forman',
  'Ridley Scott',
  'James Cameron',
];

const WRITERS = [
  'Luc Besson',
  'John Hughes',
  'Christopher Nolan',
  'Martin Scorsese',
  'Guy Ritchie',
  'Frank Darabont',
  'Stephen King',
  'Danny Boyle',
  'Quentin Tarantino',
];

const ACTORS = [
  'Jim Carrey',
  'Uma Thurman',
  'Morgan Freeman',
  'Natalie Portman',
  'Leonardo DiCaprio',
  'Cameron Diaz',
  'Johnny Depp',
  'Zooey Deschanel',
  'Brad Pitt',
  'Lea Seydoux',
];

const COUNTRIES = [
  'USA',
  'France',
  'Italy',
  'Russia',
  'Japan',
];

const GENRES = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
];

let movieId = 0;

const generateText = () => {
  const textRandom = getRandomInteger(1, 5);
  const newArray = getNewArray(DESCRIPTIONS, textRandom);
  const array = getShuffledArray(newArray);
  return array.join(' ');
};

const generateWriters = () => {
  const writersRandom = getRandomInteger(1, 3);
  const newArray = getNewArray(WRITERS, writersRandom);
  const array = getShuffledArray(newArray);
  return array;
};

const generateActors = () => {
  const actorsRandom = getRandomInteger(1, 3);
  const newArray = getNewArray(ACTORS, actorsRandom);
  const array = getShuffledArray(newArray);
  return array;
};

const generateGenres = () => {
  const genresRandom = getRandomInteger(1, 3);
  const newArray = getNewArray(GENRES, genresRandom);
  const array = getShuffledArray(newArray);
  return array;
};

const getDateCreate = () => {
  const year = getRandomInteger(0, 100);
  const month = getRandomInteger(0, 12);
  const day = getRandomInteger(0, 31);
  const data = new Date(year, month, day);
  return data;
};

export const generateFilm = () => {
  return {
    id: movieId++,
    title: getRandomArrayElement(TITLES),
    alternativeTitle: getRandomArrayElement(TITLES),
    poster: getRandomArrayElement(POSTERS),
    description: generateText(),
    totalRating: Number(getRandomFixed(1, 10, 1)),
    ageRating: getRandomArrayElement(AGE_RATING),
    director: getRandomArrayElement(DIRECTORS),
    writers: generateWriters(),
    actors: generateActors(),
    date: getDateCreate(),
    country: getRandomArrayElement(COUNTRIES),
    runtime: Number(getRandomInteger(1, 180)),
    genres: generateGenres(),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comment: new Array(getRandomInteger(0, 5)).fill().map(() => generateComment()),
  };
};

export { generateText };
