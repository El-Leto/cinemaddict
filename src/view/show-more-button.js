import AbstractView from './abstract.js';

const createShowMoreButtonTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._showMoreclickHandler = this._showMoreclickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _showMoreclickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setShowMoreClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._showMoreclickHandler);
  }
}
