import dayjs from 'dayjs';
import { TimeRange, UserRank } from '../const.js';

const watchedFilms = (array) => {
  return array.filter((film) => film.userDetails.isWatched);
};

// const watchedFilmsCount = (array) => {
//   return watchedFilms(array).length;
// };

const countWatchedFilms = (films) => films
  .reduce((count, {userDetails}) => userDetails.isWatched ? count + 1 : count, 0);

const rank = [
  { title: 'Novice', watched: 10},
  { title: 'Fan', watched: 20},
  { title: 'Movie Buff', watched: Infinity},
];

const getRankName = (films) => {
  const length = films;
  const name = rank.find((item) => item.watched === length || item.watched > length);
  return name.title;
};

const filterWatchedFilmsInRange = ({films, range}) => {
  if (range === TimeRange.ALL_TIME) {
    return films;
  }

  return films.filter((film) => {
    const dateNow = dayjs();

    return dayjs(film.userDetails.watchingDate).isSame(dateNow, range);
  });
};

export { getRankName, filterWatchedFilmsInRange, watchedFilms, countWatchedFilms };


// Для этого советую использовать (константовйй) массив с названием ранка и макс.
// значением нужного кол. просмотров: [ { title: 'Novice', watched: 10 }, ... ].
// Чтобы из него получить объект с title имея общие кол. просмотров (вычисляется
//   отдельным циклом по массиву) создай функцию, которая будет использовать Array.p.find