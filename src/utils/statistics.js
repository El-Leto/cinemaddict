import dayjs from 'dayjs';
import { TimeRange } from '../const.js';

const WATCHED_TITLES = [
  {watched: 21, title: 'Movie Buff'},
  {watched: 11, title: 'Fan'},
  {watched: 1, title: 'Novice'},
  { watched: 0, title: '' },
];

const watchedFilms = (array) => {
  return array.filter((film) => film.isWatched);
};

const countWatchedFilms = (films) => films
  .reduce((count, film) => film.isWatched ? count + 1 : count, 0);

const getRankTitle = (value) => WATCHED_TITLES
  .find(({watched}) => watched <= value)
  .title;

const filterWatchedFilmsInRange = ({films, range}) => {
  if (range === TimeRange.ALL_TIME) {
    return films;
  }

  return films.filter((film) => {
    const dateNow = dayjs();

    return dayjs(film.watchingDate).isSame(dateNow, range);
  });
};

export { getRankTitle, filterWatchedFilmsInRange, watchedFilms, countWatchedFilms };
