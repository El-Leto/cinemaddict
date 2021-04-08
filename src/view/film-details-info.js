export const createInfoTemplate = (film) => {
  const {
    title,
    totalRating,
    director,
    writers,
    actors,
    dateCreate,
    runtime,
    country,
    genre,
    description,
  } = film;

  const genreTitle = genre.length > 1 ? 'Genres': 'Genre';

  const createGenreSpan = (genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  };

  const genreList = genre.split(', ').map((genre) => createGenreSpan(genre)).join('');

  return (
    `<div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${title}</h3>
          <p class="film-details__title-original">Original: ${title}</p>
        </div>
        <div class="film-details__rating">
          <p class="film-details__total-rating">${totalRating}</p>
        </div>
      </div>
      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${writers}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${actors}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${dateCreate.format('D MMMM YYYY')}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${runtime}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${country}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">${genreTitle}</td>
          <td class="film-details__cell">
            ${genreList}
        </tr>
      </table>
      <p class="film-details__film-description">${description}</p>
    </div>`
  );
};
