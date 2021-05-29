const createControlTemplate = (name, title, isChecked = false, isDisabled) => (
  `<input
    class="film-details__control-input visually-hidden"
    id="${name}"
    name="${name}"
    type="checkbox"
    ${isChecked ? 'checked' : ''}
    ${isDisabled ? ' disabled' : ''}
   >
   <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${title}</label>`
);

const createControlsTemplate = (film) => {
  const {
    isWatchlist,
    isWatched,
    isFavorite,
    isDisabled,
  } = film;

  return (
    `<section class="film-details__controls">
      ${createControlTemplate('watchlist', 'Add to watchlist', isWatchlist, isDisabled)}
      ${createControlTemplate('watched', 'Already watched', isWatched, isDisabled)}
      ${createControlTemplate('favorite', 'Add to favorites', isFavorite, isDisabled)}
    </section>`
  );
};

export { createControlsTemplate };
