import { getTimeFromMins }  from '../mock/utils.js';

export const createFilmCardTemplate = (film) => {
  const {
    title,
    totalRating,
    date,
    runtime,
    genres,
    poster,
    description,
    comment,
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;

  const maxlength = 140;

  const newDescription = (description, maxlength) => {
    return (description.length > maxlength) ?
      description.slice(0, maxlength - 1) + '…' : description;
  };

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
      <p class="film-card__description">${newDescription(description, maxlength)}</p>
      <a class="film-card__comments">${comment.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};
