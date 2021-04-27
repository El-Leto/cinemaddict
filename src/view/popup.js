import { createButtonCloseTemplate, createTableTemplate, createControlsTemplate, createCommentListTemplate } from './popup/index.js';
import AbstractView from './abstract.js';

const createPopupTemplate = (film) => {
  const {
    comments,
  } = film;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          ${createButtonCloseTemplate()}
          ${createTableTemplate(film)}
          ${createControlsTemplate(film)}
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            ${createCommentListTemplate(film)}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class Popup extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._popupCloseButtonClickHandler = this._popupCloseButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._watchedClickHandler);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.clickCloseButton = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseButtonClickHandler);
  }

  _watchlistClickHandler() {
    this._callback.clickWatchlist();
  }

  _favoriteClickHandler() {
    this._callback.clickFavorite();
  }

  _watchedClickHandler() {
    this._callback.clickWatched();
  }

  _popupCloseButtonClickHandler() {
    this._callback.clickCloseButton();
  }
}
