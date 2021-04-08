export const createPosterTemplate = (film) => {
  const {
    poster,
  } = film;

  return (
    `<div class="film-details__poster">
      <img class="film-details__poster-img" src="${poster}" alt="">

      <p class="film-details__age">18+</p>
    </div>`
  );
};
