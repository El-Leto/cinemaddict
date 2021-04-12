import { getTimeFromMins, getTruncatedText }  from '../utils.js';

const MAX_LENGTH = 140;

const createControlTemplate = (className, text, value) => (
  `<button class="film-card__controls-item button film-card__controls-item--${className} ${value ? 'film-card__controls-item--active' : ''}" type="button">${text}</button>`
);

export const createFilmCardTemplate = (film) => {
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
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getTruncatedText(description, MAX_LENGTH)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        ${createControlTemplate('add-to-watchlist', 'Add to watchlist', isWatchlist)}
        ${createControlTemplate('mark-as-watched', 'Mark as watched', isWatched)}
        ${createControlTemplate('favorite', 'Mark as favorite', isFavorite)}
      </div>
    </article>`
  );
};
