import dayjs from 'dayjs';
import { TimeRange, Rank } from '../const.js';

const rank = {
  [Rank.NOVICE]: (count) => count <= 10,
  [Rank.FAN]: (count) => count <= 20 && count > 10,
  [Rank.MOVIE_BUFF]: (count) => count > 20,
};

const getRankName = (films) => {
  const watchedFilms = films.filter((film) => film.userDetails.isWatched);
  const watchedFilmsAmount = watchedFilms.length;
  const [rankName] = Object.entries(rank)
    .filter(([, rankCount]) => rankCount(watchedFilmsAmount))
    .flat();

  return rankName;
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

export { getRankName, filterWatchedFilmsInRange };
