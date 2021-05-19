const filmToFilterMap = {
  all: (films) => films.slice,
  watchlist: (films) => films.filter((film) => film.userDetails.isWatchlist).length,
  history: (films) => films.filter((film) => film.userDetails.isWatched).length,
  favorites: (films) => films.filter((film) => film.userDetails.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
