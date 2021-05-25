import PopupView from '../view/popup.js';
import { render, remove } from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const HIDE_CLASS = 'hide-overflow';
const ESCAPE_KEYS = ['Escape', 'Esc'];

const isEscEvent = (evt) => ESCAPE_KEYS.includes(evt.key);
export default class Popup {
  constructor(container, changeData, commentsModel, api) {
    this._container = container;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._api = api;

    this._view = null;

    this._buttonEscKeydownHandler = this._buttonEscKeydownHandler.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._render();
  }

  _render() {
    const prevView = this._view;
    const comments = this._getComments();
    this._view = new PopupView(this._film, comments);
    if (this._view !== null) {
      remove(prevView);
    }

    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.set(UpdateType.INIT, comments);
        this._renderApi();
      })
      .catch(() => {
        this._commentsModel.set(UpdateType.INIT, []);
        this._renderApi();
      });


    document.addEventListener('keydown', this._buttonEscKeydownHandler);
    document.body.classList.add(HIDE_CLASS);
  }

  _renderApi() {
    render(document.body, this._view);
    this._setViewEventListeners();
  }

  isOpen(film) {
    return this._view !== null && this._film.id == film.id;
  }

  _getComments() {
    return this._commentsModel.get();
  }

  _setViewEventListeners() {
    this._view.setWatchlistClickHandler(this._handleWatchlistClick);
    this._view.setFavoriteClickHandler(this._handleFavoriteClick);
    this._view.setWatchedClickHandler(this._handleWatchedClick);
    this._view.setCloseButtonClickHandler(this._handleCloseButtonClick);
  }

  _close() {
    remove(this._view);
    this._view = null;
    document.body.classList.remove(HIDE_CLASS);
    document.removeEventListener('keydown', this._buttonEscKeydownHandler);
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

  _handleCloseButtonClick() {
    this._close();
  }

  _buttonEscKeydownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._close();
    }
  }
}
