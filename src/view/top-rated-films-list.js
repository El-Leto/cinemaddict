import AbstractView from './abstract.js';

const createTopRatedFilmsListTemplate = () => {
  return (
    `<section class="films-list films-list--extra films-list--top-rated">
      <h2 class="films-list__title">Top rated</h2>
    </section>`
  );
};

export default class TopRatedFilmsList extends AbstractView {
  getTemplate() {
    return createTopRatedFilmsListTemplate();
  }
}
