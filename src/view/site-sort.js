import AbstractView from './abstract.js';
import { SortType } from '../const.js';

const createSiteSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class SiteSort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createSiteSortTemplate();
  }

  setSortTypeChangeHandler(callback) {
    this._callback.changeSortType = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    if (!evt.target.classList.contains('sort__button--active')) {
      this._removeButtonActive();
      evt.target.classList.add('sort__button--active');
    }

    this._callback.changeSortType(evt.target.dataset.sortType);
  }

  _removeButtonActive() {
    this.getElement().querySelector('.sort__button--active').classList.remove('sort__button--active');
  }
}
