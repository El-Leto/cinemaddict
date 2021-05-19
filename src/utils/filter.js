import {FilterType} from '../const';
export const filterTypeToFilterFilms = {
  [FilterType.ALL_MOVIES]: (films) => films.slice(),
  [FilterType.WATHCLIST]: (films) => films.filter((film) => film.userDetails.isWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.isFavorite),
};
