import { createElement } from '../utils.js';

const createAllFilmsListTemplate = () => {
  return (
    '<div class="films-list__container"></div>'
  );
};

export default class AllFilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAllFilmsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
