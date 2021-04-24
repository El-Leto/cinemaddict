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

    this._watchlistChangeHandler = this._watchlistChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
    this._watchedChangeHandler = this._watchedChangeHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  setWatchlistChangeHandler(callback) {
    this._callback.watchlistChange = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('change', this._watchlistChangeHandler);
  }

  setFavoriteChangeHandler(callback) {
    this._callback.favoriteChange = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('change', this._favoriteChangeHandler);
  }

  setWatchedChangeHandler(callback) {
    this._callback.watchedChange = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('change', this._watchedChangeHandler);
  }

  _watchlistChangeHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistChange();
  }

  _favoriteChangeHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteChange();
  }

  _watchedChangeHandler(evt) {
    evt.preventDefault();
    this._callback.watchedChange();
  }
}
