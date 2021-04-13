const createControlTemplate = (id, text, value) => (
  `<input type="checkbox" ${value ? 'checked' : ''} class="film-details__control-input visually-hidden" id="${id}" name="${id}">
    <label for="${id}" class="film-details__control-label film-details__control-label--${id}">${text}</label>`
);

const createControlsTemplate = (film) => {
  const {
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;

  return (
    `<section class="film-details__controls">
      ${createControlTemplate('watchlist', 'Add to watchlist', isWatchlist)}
      ${createControlTemplate('watched', 'Already watched', isWatched)}
      ${createControlTemplate('favorite', 'Add to favorites', isFavorite)}
    </section>`
  );
};

export { createControlsTemplate };
