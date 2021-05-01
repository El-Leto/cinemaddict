import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import { render, replace, remove } from '../utils/render.js';

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
    this._popupView = null;
    this._mode = Mode.CLOSE;

    this._handleViewClick = this._handleViewClick.bind(this);
    this._buttonEscKeydownHandler = this._buttonEscKeydownHandler.bind(this);
    this._handlePopupCloseButtonClick = this._handlePopupCloseButtonClick.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardView = this._view;
    const prevPopupView = this._popupView;

    this._view = new FilmCardView(film);
    this._popupView = new PopupView(film);

    this._view.setPosterClickHandler(this._handleViewClick);
    this._view.setTitleClickHandler(this._handleViewClick);
    this._view.setCommentsClickHandler(this._handleViewClick);

    this._view.setWatchlistClickHandler(this._handleWatchlistClick);
    this._view.setFavoriteClickHandler(this._handleFavoriteClick);
    this._view.setWatchedClickHandler(this._handleWatchedClick);

    this._setPopupEventListeners();

    if (prevFilmCardView === null || prevPopupView === null) {
      render(this._container, this._view);
      return;
    }

    if (this._mode === Mode.CLOSE) {
      replace(this._view, prevFilmCardView);
    }

    if (this._mode === Mode.OPENED) {
      replace(this._popupView, prevPopupView);
      replace(this._view, prevFilmCardView);
    }

    remove(prevFilmCardView);
    remove(prevPopupView);
  }

  destroy() {
    remove(this._view);
    remove(this._popupView);
    this._closeFilmDetail();
  }

  resetView() {
    if (this._mode === Mode.OPENED) {
      this._closeFilmDetail();
    }
  }

  _setPopupEventListeners() {
    this._popupView.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupView.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupView.setWatchedClickHandler(this._handleWatchedClick);
    this._popupView.setCloseButtonClickHandler(this._handlePopupCloseButtonClick);
  }

  _handleViewClick() {
    if (this._mode === Mode.OPENED) {
      return;
    }
    this._changeMode();

    this._setPopupEventListeners();
    document.addEventListener('keydown', this._buttonEscKeydownHandler);
    document.body.classList.add('hide-overflow');
    render(document.body, this._popupView);

    this._mode = Mode.OPENED;
  }

  _closeFilmDetail() {
    remove(this._popupView);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._buttonEscKeydownHandler);
    this._mode = Mode.CLOSE;
  }

  _handleWatchlistClick() {
    this._changeData(
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
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeFilmDetail();
    }
  }
}
