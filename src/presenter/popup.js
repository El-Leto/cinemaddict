import PopupView from '../view/popup.js';
import { render, remove } from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const HIDE_CLASS = 'hide-overflow';
const ESCAPE_KEYS = ['Escape', 'Esc'];

const isEscEvent = (evt) => ESCAPE_KEYS.includes(evt.key);

export default class Popup {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._view = null;

    this._buttonEscKeydownHandler = this._buttonEscKeydownHandler.bind(this);
    this._handlePopupCloseButtonClick = this._handlePopupCloseButtonClick.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._renderPopup();
  }

  _renderPopup() {
    if (this._view !== null) {
      this._view.updateData(this._film);
      return;
    }

    this._view = new PopupView(this._film);

    render(document.body, this._view);

    this._setPopupEventListeners();

    document.addEventListener('keydown', this._buttonEscKeydownHandler);
    document.body.classList.add(HIDE_CLASS);
  }

  getId() {
    return this._film.id;
  }

  _setPopupEventListeners() {
    this._view.setWatchlistClickHandler(this._handleWatchlistClick);
    this._view.setFavoriteClickHandler(this._handleFavoriteClick);
    this._view.setWatchedClickHandler(this._handleWatchedClick);
    this._view.setCloseButtonClickHandler(this._handlePopupCloseButtonClick);
  }

  _closeFilmDetail() {
    remove(this._view);
    this._view = null;
    document.body.classList.remove(HIDE_CLASS);
    document.removeEventListener('keydown', this._buttonEscKeydownHandler);
    //this._mode = Mode.CLOSE;
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

  _handlePopupCloseButtonClick() {
    this._closeFilmDetail();
  }

  _buttonEscKeydownHandler(evt) {
    if (isEscEvent) {
      evt.preventDefault();
      this._closeFilmDetail();
    }
  }
}
