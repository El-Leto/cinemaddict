import { createElement } from '../render.js';

const createStatisticsTemplate = (filmCount) => {
  return `<p>${filmCount} movies inside</p>`;
};

export default class Statistics {
  constructor(filmCount) {
    this._filmCount = filmCount;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._filmCount);
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
