import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import { InsertPosition, render, replace, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmCard {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._view = null;
    this._popupView = null;
    this._mode = Mode.DEFAULT;

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

    this._popupView.setWatchlistChangeHandler(this._handleWatchlistClick);
    this._popupView.setFavoriteChangeHandler(this._handleFavoriteClick);
    this._popupView.setWatchedChangeHandler(this._handleWatchedClick);

    if (prevFilmCardView === null || prevPopupView === null) {
      render(this._container, this._view, InsertPosition.BEFORE_END);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._view, prevFilmCardView);
    }

    if (this._mode === Mode.OPENED) {
      replace(this._view, prevFilmCardView);
      this._popupView = prevPopupView;
    }

    remove(prevFilmCardView);
    remove(prevPopupView);
  }

  destroy() {
    this._view.getElement().remove();
    this._view.removeElement();
  }

  resetView() {
    if (this._mode === Mode.OPENED) {
      this._closeFilmDetail();
    }
  }

  _handleViewClick() {
    document.body.classList.toggle('hide-overflow');
    document.body.appendChild(this._popupView.getElement());
    document.addEventListener('keydown', this._buttonEscKeydownHandler);
    this._mode = Mode.OPENED;
    this._popupView.setCloseButtonClickHandler(this._handlePopupCloseButtonClick);
  }

  _closeFilmDetail() {
    remove(this._popupView);
    document.body.classList.toggle('hide-overflow');
    document.removeEventListener('keydown', this._buttonEscKeydownHandler);
    this._mode = Mode.DEFAULT;
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
