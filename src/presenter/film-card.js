import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import { InsertPosition, render, replace } from '../render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmCard {
  constructor(filmCardContainer, changeData, changeMode) {
    this._filmCardContainer = filmCardContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._buttonEscKeydownHandler = this._buttonEscKeydownHandler.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film);

    this._filmCardComponent.setPosterClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setTitleClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setCommentsClickHandler(this._handleFilmCardClick);

    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);

    this._popupComponent.setWatchlistChangeHandler(this._handleWatchlistClick);
    this._popupComponent.setFavoriteChangeHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchedChangeHandler(this._handleWatchedClick);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this._filmCardContainer, this._filmCardComponent, InsertPosition.BEFORE_END);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmCardComponent);
    }

    if (this._mode === Mode.OPENED) {
      replace(this._filmComponent, prevFilmCardComponent);
      this._popupComponent = prevPopupComponent;
    }

    prevFilmCardComponent.getElement().remove();
    prevFilmCardComponent.removeElement();

    prevPopupComponent.getElement().remove();
    prevPopupComponent.removeElement();
  }

  destroy() {
    this._filmCardComponent.getElement().remove();
    this._filmCardComponent.removeElement();
  }

  resetView() {
    if (this._mode === Mode.OPENED) {
      this._closeFilmDetail();
    }
  }

  _handleFilmCardClick() {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this._popupComponent.getElement());
    document.addEventListener('keydown', this._buttonEscKeydownHandler);
    this._mode = Mode.OPENED;

    const buttonClose = document.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', () => {
      this._closeFilmDetail();
    });
  }

  _buttonEscKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeFilmDetail();
    }
  }

  _closeFilmDetail() {
    document.body.removeChild(this._popupComponent.getElement());
    this._popupComponent.removeElement();
    document.body.classList.remove('hide-overflow');
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
}
