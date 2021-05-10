const EMOJIS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const SortType = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserAction = {
  UPDATE: 'update',
  ADD_COMMENT: 'add comment',
  DELETE_COMMENT: 'delete',
};

const FilterType = {
  ALL_MOVIES: 'All movies',
  WATHCLIST: 'Watchlist',
  FAVOURITES: 'Favorites',
  HISTORY: 'History',
};

export { EMOJIS, SortType, UpdateType, UserAction, FilterType };
