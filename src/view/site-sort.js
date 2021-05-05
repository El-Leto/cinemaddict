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

    this._sortTypeClickHandler = this._sortTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteSortTemplate();
  }

  setSortTypeClickHandler(callback) {
    this._callback.clickSortType = callback;
    this.getElement().addEventListener('click', this._sortTypeClickHandler);
  }

  _removeButtonActive() {
    this.getElement().querySelector('.sort__button.sort__button--active').classList.remove('sort__button--active');
  }

  _sortTypeClickHandler(evt) {
    const target = evt.target;
    if (target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    if (!target.classList.contains('sort__button--active')) {
      this._removeButtonActive();
      target.classList.add('sort__button--active');
    }

    this._callback.clickSortType(target.dataset.sortType);
  }
}
