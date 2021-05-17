import FilmCardView from '../view/film-card.js';
import { render, replace, remove } from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  CLOSE: 'CLOSE',
  OPENED: 'OPENED',
};

export default class FilmCard {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._view = null;
    this._mode = Mode.CLOSE;

    this._handleViewClick = this._handleViewClick.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardView = this._view;

    this._view = new FilmCardView(film);

    this._view.setPosterClickHandler(this._handleViewClick);
    this._view.setTitleClickHandler(this._handleViewClick);
    this._view.setCommentsClickHandler(this._handleViewClick);

    this._view.setWatchlistClickHandler(this._handleWatchlistClick);
    this._view.setFavoriteClickHandler(this._handleFavoriteClick);
    this._view.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmCardView === null) {
      render(this._container, this._view);
      return;
    }

    replace(this._view, prevFilmCardView);
    remove(prevFilmCardView);
  }

  destroy() {
    remove(this._view);
  }

  _handleViewClick() {
    this._changeMode(this._film);
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_WATCHLIST,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FAVORITE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_WATCHED,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }
}
