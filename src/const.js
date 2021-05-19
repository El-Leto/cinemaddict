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
  UPDATE_WATCHED: 'UPDATE_WATCHED',
  UPDATE_FAVORITE: 'UPDATE_FAVORITE',
  UPDATE_WATCHLIST: 'UPDATE_WATCHLIST',
  UPDATE_COMMENTS: 'UPDATE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const FilterType = {
  ALL_MOVIES: 'All movies',
  WATHCLIST: 'Watchlist',
  FAVORITES: 'Favorites',
  HISTORY: 'History',
};

const VISUALLY_HIDDEN = 'visually-hidden';

export { EMOJIS, SortType, UpdateType, UserAction, FilterType, VISUALLY_HIDDEN };
