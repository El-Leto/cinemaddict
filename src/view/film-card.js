import { truncateText }  from '../utils/common.js';
import { getTimeFromMins }  from '../utils/data.js';
import AbstractView from './abstract.js';

const MAX_DESCRIPTION_LENGTH = 140;

const GENRE_MAIN = 0;

const createControlButtonTemplate = (name, title, isActive = false) => {
  const activeClass = isActive ? 'film-card__controls-item--active' : '';
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${name} ${activeClass}">
      ${title}
    </button>`
  );
};

const createFilmCardTemplate = (film) => {
  const {
    title,
    totalRating,
    date,
    runtime,
    genres,
    poster,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date.getFullYear()}</span>
        <span class="film-card__duration">${getTimeFromMins(runtime)}</span>
        <span class="film-card__genre">${genres[GENRE_MAIN]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${truncateText(description, MAX_DESCRIPTION_LENGTH)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        ${createControlButtonTemplate('add-to-watchlist', 'Add to watchlist', isWatchlist)}
        ${createControlButtonTemplate('mark-as-watched', 'Mark as watched', isWatched)}
        ${createControlButtonTemplate('favorite', 'Mark as favorite', isFavorite)}
      </div>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setPosterClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._posterClickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._titleClickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._commentsClickHandler);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
